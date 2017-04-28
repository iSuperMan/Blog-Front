import keyMirror from 'keymirror';
import { createAction } from 'redux-actions';

export const types = keyMirror({
	AVATAR_UPLOAD_LOADER_SHOW: null,
	AVATAR_UPLOAD_LOADER_HIDE: null,
});

export const showLoader = createAction(types.AVATAR_UPLOAD_LOADER_SHOW);
export const hideLoader = createAction(types.AVATAR_UPLOAD_LOADER_HIDE);
