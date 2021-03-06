import keyMirror from 'keymirror';
import { CALL_API, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';
import { userSchema, arrayOfUserSchemas } from '../../entities/user';
import endpoints from '../endpoints';
import { token } from '../../helpers';

export const types = keyMirror({
	AVAILABLE_USERNAME_REQUEST: null,
	AVAILABLE_USERNAME_SUCCESS: null,
	AVAILABLE_USERNAME_FAILURE: null,

	AVAILABLE_EMAIL_REQUEST: null,
	AVAILABLE_EMAIL_SUCCESS: null,
	AVAILABLE_EMAIL_FAILURE: null,

	GET_USER_BY_USERNAME_REQUEST: null,
	GET_USER_BY_USERNAME_SUCCESS: null,
	GET_USER_BY_USERNAME_FAILURE: null,

	UPDATE_USER_REQUEST: null,
	UPDATE_USER_SUCCESS: null,
	UPDATE_USER_FAILURE: null,

	FOLLOW_TO_USER_REQUEST: null,
	FOLLOW_TO_USER_SUCCESS: null,
	FOLLOW_TO_USER_FAILURE: null,

	UNFOLLOW_TO_USER_REQUEST: null,
	UNFOLLOW_TO_USER_SUCCESS: null,
	UNFOLLOW_TO_USER_FAILURE: null,
});

export const actions = {
	followToUser: userId => ({
		[CALL_API]: {
			endpoint: endpoints.FOLLOW_TO_USER_API.replace(':userId', userId),
			method: 'GET',

			headers: {
				Authorization: `Bearer ${token.get()}`,
			},

			types: [
				types.FOLLOW_TO_USER_REQUEST,

				{
					type: types.FOLLOW_TO_USER_SUCCESS,

					payload: (action, state, res) => getJSON(res).then(
						/* eslint-disable arrow-body-style */
						({ response }) => {
							return response.users
								? normalize(response.users, arrayOfUserSchemas)
								: Promise.reject();
						},
						/* eslint-enable arrow-body-style */
					),
				},

				types.FOLLOW_TO_USER_FAILURE,
			],
		},
	}),

	unfollowToUser: userId => ({
		[CALL_API]: {
			endpoint: endpoints.UNFOLLOW_TO_USER_API.replace(':userId', userId),
			method: 'GET',

			headers: {
				Authorization: `Bearer ${token.get()}`,
			},

			types: [
				types.UNFOLLOW_TO_USER_REQUEST,

				{
					type: types.UNFOLLOW_TO_USER_SUCCESS,

					payload: (action, state, res) => getJSON(res).then(
						/* eslint-disable arrow-body-style */
						({ response }) => {
							return response.users
								? normalize(response.users, arrayOfUserSchemas)
								: Promise.reject();
						},
						/* eslint-enable arrow-body-style */
					),
				},

				types.UNFOLLOW_TO_USER_FAILURE,
			],
		},
	}),

	updateUser: ({ userId, data }) => ({
		[CALL_API]: {
			endpoint: endpoints.USER_API.replace(':userId', userId),
			method: 'PUT',
			body: JSON.stringify(data),

			headers: {
				Authorization: `Bearer ${token.get()}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},

			types: [
				types.UPDATE_USER_REQUEST,

				{
					type: types.UPDATE_USER_SUCCESS,

					payload: (action, state, res) => getJSON(res).then(
						/* eslint-disable arrow-body-style */
						({ response }) => {
							return response.user
								? normalize(response.user, userSchema)
								: Promise.reject();
						},
						/* eslint-enable arrow-body-style */
					),
				},

				types.UPDATE_USER_FAILURE,
			],
		},
	}),

	fetchUserByUsername: (username, { source }) => ({
		[CALL_API]: {
			endpoint: endpoints.GET_USER_BY_USERNAME_API.replace(':username', username),
			method: 'GET',

			types: [
				{
					type: types.GET_USER_BY_USERNAME_REQUEST,
					meta: { source },
				},

				{
					type: types.GET_USER_BY_USERNAME_SUCCESS,
					meta: { source },

					payload: (action, state, res) => getJSON(res).then(
						/* eslint-disable arrow-body-style */
						({ response }) => {
							return response.user
								? normalize(response.user, userSchema)
								: Promise.reject();
						},
						/* eslint-enable arrow-body-style */
					),
				},

				{
					type: types.GET_USER_BY_USERNAME_FAILURE,
					meta: { source },
				},
			],
		},
	}),

	verifyAvailableUsername: username => ({
		[CALL_API]: {
			endpoint: endpoints.AVAILABLE_USERNAME_API,
			method: 'POST',
			body: JSON.stringify({ username }),

			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},

			types: [
				types.AVAILABLE_USERNAME_REQUEST,

				{
					type: types.AVAILABLE_USERNAME_SUCCESS,

					payload: (action, state, res) => getJSON(res).then(
						({ response }) => response || Promise.reject(),
					),
				},

				types.AVAILABLE_USERNAME_FAILURE,
			],
		},
	}),

	verifyAvailableEmail: email => ({
		[CALL_API]: {
			endpoint: endpoints.AVAILABLE_EMAIL_API,
			method: 'POST',
			body: JSON.stringify({ email }),

			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},

			types: [
				types.AVAILABLE_EMAIL_REQUEST,

				{
					type: types.AVAILABLE_EMAIL_SUCCESS,

					payload: (action, state, res) => getJSON(res).then(
						({ response }) => response || Promise.reject(),
					),
				},

				types.AVAILABLE_EMAIL_FAILURE,
			],
		},
	}),
};
