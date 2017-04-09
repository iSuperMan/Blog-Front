import keyMirror from 'keymirror';
import { createAction } from 'redux-actions';

export const types = keyMirror({
	AUTHENTICATION_PASS: null,
	AUTHENTICATION_RESET: null,
});

export const passAuthentication = createAction(types.AUTHENTICATION_PASS);
export const resetAuthentication = createAction(types.AUTHENTICATION_RESET);
