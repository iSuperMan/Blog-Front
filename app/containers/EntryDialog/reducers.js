import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { types } from './actions';

const isOpen = handleActions({
	[types.ENTRY_DIALOG_OPEN]: () => true,
	[types.ENTRY_DIALOG_CLOSE]: () => false,
}, false);

const isSignUpForm = handleActions({
	[types.ENTRY_DIALOG_FORM_TOGGLE]: state => !state,
	[types.ENTRY_DIALOG_CLOSE]: () => true,
}, true);

export default combineReducers({
	isOpen,
	isSignUpForm,
});
