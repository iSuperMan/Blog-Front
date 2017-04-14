import keyMirror from 'keymirror';
import { createAction } from 'redux-actions';

export const types = keyMirror({
	UI_HEADER_SHADOW_HIDE: null,
	UI_HEADER_SHADOW_SHOW: null,
});

export const hideHeaderShadow = createAction(types.UI_HEADER_SHADOW_HIDE);
export const showHeaderShadow = createAction(types.UI_HEADER_SHADOW_SHOW);
