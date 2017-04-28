import keyMirror from 'keymirror';
import { createAction } from 'redux-actions';

export const types = keyMirror({
	EDIT_MODE_TOGGLE: null,
});

export const toggleEditMode = createAction(types.EDIT_MODE_TOGGLE);
