import keyMirror from 'keymirror';
import { CALL_API, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';
import { storySchema } from '../../entities/story';
import endpoints from '../endpoints';
import { token } from '../../helpers';

export const types = keyMirror({
	CREATE_STORY_REQUEST: null,
	CREATE_STORY_SUCCESS: null,
	CREATE_STORY_FAILURE: null,

	UPDATE_STORY_REQUEST: null,
	UPDATE_STORY_SUCCESS: null,
	UPDATE_STORY_FAILURE: null,

	GET_STORY_REQUEST: null,
	GET_STORY_SUCCESS: null,
	GET_STORY_FAILURE: null,
});

export const actions = {
	createStory: data => ({
		[CALL_API]: {
			endpoint: endpoints.STORIES_API,
			method: 'POST',
			body: JSON.stringify(data),

			headers: {
				Authorization: `Bearer ${token.get()}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},

			types: [
				types.CREATE_STORY_REQUEST,

				{
					type: types.CREATE_STORY_SUCCESS,

					payload: (action, state, res) => getJSON(res).then(
						/* eslint-disable arrow-body-style */
						({ response }) => {
							return response.story
								? normalize(response.story, storySchema)
								: Promise.reject();
						},
						/* eslint-enable arrow-body-style */
					),
				},

				types.CREATE_STORY_FAILURE,
			],
		},
	}),

	updateStory: ({ storyId, data }) => ({
		[CALL_API]: {
			endpoint: endpoints.STORY_API.replace(':storyId', storyId),
			method: 'PUT',
			body: JSON.stringify(data),

			headers: {
				Authorization: `Bearer ${token.get()}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},

			types: [
				types.UPDATE_STORY_REQUEST,

				{
					type: types.UPDATE_STORY_SUCCESS,

					payload: (action, state, res) => getJSON(res).then(
						/* eslint-disable arrow-body-style */
						({ response }) => {
							return response.story
								? normalize(response.story, storySchema)
								: Promise.reject();
						},
						/* eslint-enable arrow-body-style */
					),
				},

				types.UPDATE_STORY_FAILURE,
			],
		},
	}),

	getStory: storyId => ({
		[CALL_API]: {
			endpoint: endpoints.STORY_API.replace(':storyId', storyId),
			method: 'GET',

			types: [
				types.GET_STORY_REQUEST,

				{
					type: types.GET_STORY_SUCCESS,

					payload: (action, state, res) => getJSON(res).then(
						/* eslint-disable arrow-body-style */
						({ response }) => {
							return response.story
								? normalize(response.story, storySchema)
								: Promise.reject();
						},
						/* eslint-enable arrow-body-style */
					),
				},

				types.GET_STORY_FAILURE,
			],
		},
	}),
};
