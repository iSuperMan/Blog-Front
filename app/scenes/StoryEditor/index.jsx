// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, lifecycle, withProps, withState } from 'recompose';
import { getFormValues, initialize as initializeForm } from 'redux-form';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import PublishConfirmDialog from './components/PublishConfirmDialog';
import StoryForm from './components/StoryForm';
import UserPreview from './components/UserPreview';
import { selectors as authSelectors } from '../../services/auth';
import type { User } from '../../services/entities/user';
import type { Story } from '../../services/entities/story';
import reducers from './reducers';
import * as selectors from './selectors';
import { stories as storiesAPI } from '../../services/api';
import { resetStoryEditor } from './actions';

type NewStoryProps = {
	user: User,
	story: Story | null,
	isFetching: boolean,
	isSaving: boolean,
	hasUnsavedChanges: boolean,
	openPublishConfirmDialog: () => void,
	closePublishConfirmDialog: () => void,
	publishConfirmDialog: boolean,
	publishStory: () => void,

	match: {
		params: {
			storyId?: string,
		}
	}
};

const StoryEditor = (props : NewStoryProps) => {
	if (!props.story && (props.isFetching || props.match.params.storyId)) {
		return null;
	}

	return (
		<div
			className="container"
			style={{ marginTop: 25 }}
		>
			<div className="row">
				<div className="col-sm-10 offset-sm-1">
					<div className="row" style={{ marginBottom: 45 }}>
						<div className="col-sm-10">
							<UserPreview user={props.user} />
						</div>

						<div className="col-sm-2" style={{ textAlign: 'right' }}>
							<div style={{ color: '#616161', fontStyle: 'italic', fontSize: 14 }}>
								{ props.isSaving && 'Saving ...' }
								{ !props.isSaving && props.hasUnsavedChanges && 'Unsaved changes' }
								{ !props.isSaving && !props.hasUnsavedChanges && props.story && 'Saved' }
							</div>

							<RaisedButton
								disabled={!props.story || (props.story
									&& props.story.isPublished
									&& !props.story.hasUnpublishedChanges)
								}

								label="Publish"
								primary
								style={{ marginTop: 10 }}
								onTouchTap={props.openPublishConfirmDialog}
							/>
						</div>
					</div>

					<StoryForm />

					{props.story && <PublishConfirmDialog
						isOpen={props.publishConfirmDialog}
						onCancel={props.closePublishConfirmDialog}
						onConfirm={props.publishStory}
					/>}
				</div>
			</div>
		</div>
	);
};

export { reducers };

export default compose(
	withRouter,

	connect(
		state => ({
			user: authSelectors.getUser(state),
			formData: getFormValues('story-form')(state),
			isSaving: selectors.getIsSaving(state),
			isFetching: selectors.getIsFetching(state),
			story: selectors.getStory(state),
		}),

		{
			createStory: storiesAPI.actions.createStory,
			initializeForm,
			updateStory: storiesAPI.actions.updateStory,
			getStory: storiesAPI.actions.getStory,
			publishStory: storiesAPI.actions.publishStory,
			resetStoryEditor,
		},
	),

	withState('publishConfirmDialog', 'setPublishConfirmDialog', false),

	withProps(
		({ formData, story }) => ({
			hasUnsavedChanges: story
				&& formData
				&& !_.isEqual(formData, { ..._.pick(story.draftContent, ['text', 'name']) }),
		}),
	),

	withHandlers({
		openPublishConfirmDialog: props => () => props.setPublishConfirmDialog(true),
		closePublishConfirmDialog: props => () => props.setPublishConfirmDialog(false),

		saveForm: props => () => {
			if (!_.isEmpty(props.formData) && !props.isSaving && !props.isFetching) {
				const storyId = _.get(props, 'story._id');

				if (!storyId) {
					props.createStory(props.formData)
						.then(({ payload }) => props.history.push(`/p/${payload.result}`));
				} else if (props.hasUnsavedChanges) {
					props.updateStory({ storyId, data: props.formData });
				}
			}
		},
	}),

	withHandlers({
		publishStory: props => () => props.publishStory(props.story._id)
			.then(() => props.closePublishConfirmDialog()),
	}),

	lifecycle({
		componentDidMount() {
			const storyId = _.get(this.props, 'match.params.storyId');

			if (storyId) {
				this.props.getStory(storyId);
			}

			this.autosaver = setInterval(this.props.saveForm, 5000);
		},

		componentWillReceiveProps(nextProps) {
			if (_.isEmpty(this.props.formData) && !this.props.story && nextProps.story) {
				this.props.initializeForm('story-form', { ..._.pick(nextProps.story.draftContent, ['text', 'name']) });
			}

			if (!nextProps.match.params.storyId && this.props.match.params.storyId) {
				this.props.initializeForm('story-form', {});
				this.props.resetStoryEditor();
			}

			if (!this.props.match.params.storyId && nextProps.match.params.storyId) {
				this.props.getStory(nextProps.match.params.storyId);
			}
		},

		componentWillUnmount() {
			clearInterval(this.autosaver);
		},
	}),
)(StoryEditor);
