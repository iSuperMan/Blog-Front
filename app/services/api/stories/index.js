import keyMirror from 'keymirror';
import _ from 'lodash';
import { CALL_API, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';
import { storySchema, arrayOfStorySchemas } from '../../entities/story';
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

	GET_PUBLICATION_REQUEST: null,
	GET_PUBLICATION_SUCCESS: null,
	GET_PUBLICATION_FAILURE: null,

	PUBLISH_STORY_REQUEST: null,
	PUBLISH_STORY_SUCCESS: null,
	PUBLISH_STORY_FAILURE: null,

	PUBLISHED_STORIES_BY_USER_REQUEST: null,
	PUBLISHED_STORIES_BY_USER_SUCCESS: null,
	PUBLISHED_STORIES_BY_USER_FAILURE: null,

	DRAFT_STORIES_BY_USER_REQUEST: null,
	DRAFT_STORIES_BY_USER_SUCCESS: null,
	DRAFT_STORIES_BY_USER_FAILURE: null,

	DELETE_STORY_REQUEST: null,
	DELETE_STORY_SUCCESS: null,
	DELETE_STORY_FAILURE: null,
});

export const actions = {
	getPublishedStoriesByUser: userId => ({
		[CALL_API]: {
			endpoint: endpoints.PUBLISHED_STORIES_BY_USER_API.replace(':userId', userId),
			method: 'GET',

			types: [
				types.PUBLISHED_STORIES_BY_USER_REQUEST,

				{
					type: types.PUBLISHED_STORIES_BY_USER_SUCCESS,

					payload: (action, state, res) => getJSON(res).then(
						/* eslint-disable arrow-body-style */
						({ response }) => {
							return response.stories
								? normalize(response.stories, arrayOfStorySchemas)
								: Promise.reject();
						},
						/* eslint-enable arrow-body-style */
					),
				},

				types.PUBLISHED_STORIES_BY_USER_FAILURE,
			],
		},
	}),

	getDraftStoriesByUser: userId => ({
		[CALL_API]: {
			endpoint: endpoints.DRAFT_STORIES_BY_USER_API.replace(':userId', userId),
			method: 'GET',

			headers: {
				Authorization: `Bearer ${token.get()}`,
			},

			types: [
				types.DRAFT_STORIES_BY_USER_REQUEST,

				{
					type: types.DRAFT_STORIES_BY_USER_SUCCESS,

					payload: (action, state, res) => getJSON(res).then(
						/* eslint-disable arrow-body-style */
						({ response }) => {
							return response.stories
								? normalize(response.stories, arrayOfStorySchemas)
								: Promise.reject();
						},
						/* eslint-enable arrow-body-style */
					),
				},

				types.DRAFT_STORIES_BY_USER_FAILURE,
			],
		},
	}),

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
			body: JSON.stringify(_.omitBy(data, _.isNull)),

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

	publishStory: storyId => ({
		[CALL_API]: {
			endpoint: endpoints.PUBLISH_STORY_API.replace(':storyId', storyId),
			method: 'GET',

			headers: {
				Authorization: `Bearer ${token.get()}`,
			},

			types: [
				types.PUBLISH_STORY_REQUEST,

				{
					type: types.PUBLISH_STORY_SUCCESS,

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

				types.PUBLISH_STORY_FAILURE,
			],
		},
	}),

	deleteStory: storyId => ({
		[CALL_API]: {
			endpoint: endpoints.STORY_API.replace(':storyId', storyId),
			method: 'DELETE',

			headers: {
				Authorization: `Bearer ${token.get()}`,
			},

			types: [
				types.DELETE_STORY_REQUEST,

				{
					type: types.DELETE_STORY_SUCCESS,
					meta: { delete: true, entity: 'stories', id: storyId },
				},

				types.DELETE_STORY_FAILURE,
			],
		},
	}),

	getPublication: storyId => ({
		[CALL_API]: {
			endpoint: endpoints.PUBLICATION_API.replace(':storyId', storyId),
			method: 'GET',

			types: [
				types.GET_PUBLICATION_REQUEST,

				{
					type: types.GET_PUBLICATION_SUCCESS,

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

				types.GET_PUBLICATION_FAILURE,
			],
		},
	}),

	getStory: storyId => ({
		[CALL_API]: {
			endpoint: endpoints.STORY_API.replace(':storyId', storyId),
			method: 'GET',

			headers: {
				Authorization: `Bearer ${token.get()}`,
			},

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
