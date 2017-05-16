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

	RECOMMENDS_STORIES_BY_USER_REQUEST: null,
	RECOMMENDS_STORIES_BY_USER_SUCCESS: null,
	RECOMMENDS_STORIES_BY_USER_FAILURE: null,

	LATESTS_STORIES_REQUEST: null,
	LATESTS_STORIES_SUCCESS: null,
	LATESTS_STORIES_FAILURE: null,

	POPULAR_STORIES_REQUEST: null,
	POPULAR_STORIES_SUCCESS: null,
	POPULAR_STORIES_FAILURE: null,

	DRAFT_STORIES_BY_USER_REQUEST: null,
	DRAFT_STORIES_BY_USER_SUCCESS: null,
	DRAFT_STORIES_BY_USER_FAILURE: null,

	DELETE_STORY_REQUEST: null,
	DELETE_STORY_SUCCESS: null,
	DELETE_STORY_FAILURE: null,

	POST_STORY_COMMENTARY_REQUEST: null,
	POST_STORY_COMMENTARY_SUCCESS: null,
	POST_STORY_COMMENTARY_FAILURE: null,

	LIKE_STORY_REQUEST: null,
	LIKE_STORY_SUCCESS: null,
	LIKE_STORY_FAILURE: null,

	UNLIKE_STORY_REQUEST: null,
	UNLIKE_STORY_SUCCESS: null,
	UNLIKE_STORY_FAILURE: null,
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

	getLatestsStories: () => ({
		[CALL_API]: {
			endpoint: endpoints.LATESTS_STORIES_API,
			method: 'GET',

			types: [
				types.LATESTS_STORIES_REQUEST,

				{
					type: types.LATESTS_STORIES_SUCCESS,

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

				types.LATESTS_STORIES_FAILURE,
			],
		},
	}),

	getPopularStories: () => ({
		[CALL_API]: {
			endpoint: endpoints.POPULAR_STORIES_API,
			method: 'GET',

			types: [
				types.POPULAR_STORIES_REQUEST,

				{
					type: types.POPULAR_STORIES_SUCCESS,

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

				types.POPULAR_STORIES_FAILURE,
			],
		},
	}),

	getRecommendsStoriesByUser: userId => ({
		[CALL_API]: {
			endpoint: endpoints.RECOMMENDS_STORIES_BY_USER_API.replace(':userId', userId),
			method: 'GET',

			types: [
				types.RECOMMENDS_STORIES_BY_USER_REQUEST,

				{
					type: types.RECOMMENDS_STORIES_BY_USER_SUCCESS,

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

				types.RECOMMENDS_STORIES_BY_USER_FAILURE,
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

	likeStory: storyId => ({
		[CALL_API]: {
			endpoint: endpoints.LIKE_STORY_API.replace(':storyId', storyId),
			method: 'GET',

			headers: {
				Authorization: `Bearer ${token.get()}`,
			},

			types: [
				types.LIKE_STORY_REQUEST,

				{
					type: types.LIKE_STORY_SUCCESS,

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

				types.LIKE_STORY_FAILURE,
			],
		},
	}),

	unlikeStory: storyId => ({
		[CALL_API]: {
			endpoint: endpoints.UNLIKE_STORY_API.replace(':storyId', storyId),
			method: 'GET',

			headers: {
				Authorization: `Bearer ${token.get()}`,
			},

			types: [
				types.UNLIKE_STORY_REQUEST,

				{
					type: types.UNLIKE_STORY_SUCCESS,

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

				types.UNLIKE_STORY_FAILURE,
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

	postStoryCommentary: ({ storyId, body }) => ({
		[CALL_API]: {
			endpoint: endpoints.STORY_COMMENTARY_API.replace(':storyId', storyId),
			method: 'POST',
			body: JSON.stringify({ body }),

			headers: {
				Authorization: `Bearer ${token.get()}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},

			types: [
				types.POST_STORY_COMMENTARY_REQUEST,

				{
					type: types.POST_STORY_COMMENTARY_SUCCESS,

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

				types.POST_STORY_COMMENTARY_FAILURE,
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
