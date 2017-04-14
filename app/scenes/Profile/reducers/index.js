import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { types } from '../actions';
import user from './user';

export default combineReducers({
	user,

	editMode: handleActions({
		[types.EDIT_MODE_TOGGLE]: state => !state,
	}, false),
});
