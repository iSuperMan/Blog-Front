// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, lifecycle, withProps } from 'recompose';
import { getFormValues } from 'redux-form';
import { withRouter } from 'react-router';
import StoryForm from './components/StoryForm';
import UserPreview from './components/UserPreview';
import { selectors as authSelectors } from '../../services/auth';
import type { User } from '../../services/entities/user';
import type { Story } from '../../services/entities/story';
import reducers from './reducers';
import * as selectors from './selectors';
import { stories as storiesAPI } from '../../services/api';

type NewStoryProps = {
	user: User,
	story: Story | null,
	isFetching: boolean,
	isSaving: boolean,
	hasUnsavedChanges: boolean,
	initialValues: {} | null,
	match: {
		params: {
			storyId?: string,
		}
	}
};

const StoryEditor = (props : NewStoryProps) => {
	if (props.isFetching || (props.match.params.storyId && !props.story)) {
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
						<div className="col-sm-4">
							<UserPreview user={props.user} />
						</div>

						<div className="col-sm-8">
							{ props.isSaving && 'Saving ...' }
							{ !props.isSaving && props.hasUnsavedChanges && 'Unsaved changes' }
							{ !props.isSaving && !props.hasUnsavedChanges && props.story && 'Saved' }
						</div>
					</div>

					<StoryForm initialValues={props.initialValues} />
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
			updateStory: storiesAPI.actions.updateStory,
			getStory: storiesAPI.actions.getStory,
		},
	),

	withProps(
		({ formData, story }) => {
			const initialValues = story ? { ..._.pick(story, ['text', 'name']) } : null;

			return {
				initialValues,
				hasUnsavedChanges: initialValues && formData && !_.isEqual(formData, initialValues),
			};
		},
	),

	withHandlers({
		saveForm: props => () => {
			if (props.formData && !props.isSaving && !props.isFetching) {
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

		componentWillUnmount() {
			clearInterval(this.autosaver);
		},
	}),
)(StoryEditor);
