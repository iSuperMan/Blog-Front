import keyMirror from 'keymirror';
import { CALL_API, getJSON } from 'redux-api-middleware';
import endpoints from '../endpoints';

export const types = keyMirror({
	AVAILABLE_USERNAME_REQUEST: null,
	AVAILABLE_USERNAME_SUCCESS: null,
	AVAILABLE_USERNAME_FAILURE: null,

	AVAILABLE_EMAIL_REQUEST: null,
	AVAILABLE_EMAIL_SUCCESS: null,
	AVAILABLE_EMAIL_FAILURE: null,
});

export const actions = {
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
