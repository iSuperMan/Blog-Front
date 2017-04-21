// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, lifecycle, withProps } from 'recompose';
import { getFormValues, initialize as initializeForm } from 'redux-form';
import { withRouter } from 'react-router';
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

						<div className="col-sm-2">
							<div style={{ textAlign: 'right', color: '#616161', fontStyle: 'italic', fontSize: 14 }}>
								{ props.isSaving && 'Saving ...' }
								{ !props.isSaving && props.hasUnsavedChanges && 'Unsaved changes' }
								{ !props.isSaving && !props.hasUnsavedChanges && props.story && 'Saved' }
							</div>
						</div>
					</div>

					<StoryForm />
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
			resetStoryEditor,
		},
	),

	withProps(
		({ formData, story }) => ({
			hasUnsavedChanges: story
				&& formData
				&& !_.isEqual(formData, { ..._.pick(story, ['text', 'name']) }),
		}),
	),

	withHandlers({
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
				this.props.initializeForm('story-form', { ..._.pick(nextProps.story, ['text', 'name']) });
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
