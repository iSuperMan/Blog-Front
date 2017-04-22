import keyMirror from 'keymirror';
import { createAction } from 'redux-actions';

export const types = keyMirror({
	COVER_IMAGE_LOADER_SHOW: null,
	COVER_IMAGE_LOADER_HIDE: null,
});

export const showCoverImageLoader = createAction(types.COVER_IMAGE_LOADER_SHOW);
export const hideCoverImageLoader = createAction(types.COVER_IMAGE_LOADER_HIDE);
