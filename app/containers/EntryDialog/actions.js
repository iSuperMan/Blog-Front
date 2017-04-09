import keyMirror from 'keymirror';
import { createAction } from 'redux-actions';

export const types = keyMirror({
	ENTRY_DIALOG_OPEN: null,
	ENTRY_DIALOG_CLOSE: null,
	ENTRY_DIALOG_FORM_TOGGLE: null,
});

export const openEntryDialog = createAction(types.ENTRY_DIALOG_OPEN);
export const closeEntryDialog = createAction(types.ENTRY_DIALOG_CLOSE);
export const toggleEntryDialogForm = createAction(types.ENTRY_DIALOG_FORM_TOGGLE);
