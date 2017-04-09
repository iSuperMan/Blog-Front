import keyMirror from 'keymirror';
import { CALL_API, getJSON, InternalError } from 'redux-api-middleware';
import { normalize } from 'normalizr';
import endpoints from '../endpoints';
import { userSchema } from '../../entities/user';
import { token } from '../../helpers';

export const types = keyMirror({
	SIGNIN_REQUEST: null,
	SIGNIN_SUCCESS: null,
	SIGNIN_FAILURE: null,

	SIGNUP_REQUEST: null,
	SIGNUP_SUCCESS: null,
	SIGNUP_FAILURE: null,

	ME_REQUEST: null,
	ME_SUCCESS: null,
	ME_FAILURE: null,
});

export const actions = {
	signIn: data => ({
		[CALL_API]: {
			endpoint: endpoints.SIGNIN_API,
			method: 'POST',
			body: JSON.stringify(data),

			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},

			types: [
				types.SIGNIN_REQUEST,

				{
					type: types.SIGNIN_SUCCESS,

					payload: (action, state, res) => getJSON(res).then(
						/* eslint-disable arrow-body-style */
						({ response }) => {
							return response.user
								? { ...normalize(response.user, userSchema), token: response.token }
								: Promise.reject(new InternalError('Invalid login data'));
						},
						/* eslint-enable arrow-body-style */
					),
				},

				types.SIGNIN_FAILURE,
			],
		},
	}),

	signUp: data => ({
		[CALL_API]: {
			endpoint: endpoints.SIGNUP_API,
			method: 'POST',
			body: JSON.stringify(data),

			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},

			types: [
				types.SIGNUP_REQUEST,

				{
					type: types.SIGNUP_SUCCESS,

					payload: (action, state, res) => getJSON(res).then(
						/* eslint-disable arrow-body-style */
						({ response }) => {
							return response.user
								? { ...normalize(response.user, userSchema), token: response.token }
								: Promise.reject();
						},
						/* eslint-enable arrow-body-style */
					),
				},

				types.SIGNUP_FAILURE,
			],
		},
	}),

	getMe: () => ({
		[CALL_API]: {
			endpoint: endpoints.ME_API,
			method: 'GET',

			headers: {
				Authorization: `Bearer ${token.get()}`,
			},

			types: [
				types.ME_REQUEST,

				{
					type: types.ME_SUCCESS,

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

				types.ME_FAILURE,
			],
		},
	}),
};
