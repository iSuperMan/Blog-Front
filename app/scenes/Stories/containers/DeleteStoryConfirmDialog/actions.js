import keyMirror from 'keymirror';
import { createAction } from 'redux-actions';

export const types = keyMirror({
	DELETE_STORY_CONFIRMATION_DIALOG_OPEN: null,
	DELETE_STORY_CONFIRMATION_DIALOG_CLOSE: null,
});

export const closeDeleteConfirmDialog = createAction(types.DELETE_STORY_CONFIRMATION_DIALOG_CLOSE);

export const openDeleteConfirmDialog = createAction(
	types.DELETE_STORY_CONFIRMATION_DIALOG_OPEN,
	(storyId: string) => ({ storyId }),
);
