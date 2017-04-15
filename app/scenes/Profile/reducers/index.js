import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducers as avatarPicker } from '../containers/AvatarPicker';
import { types } from '../actions';
import user from './user';

export default combineReducers({
	avatarPicker,
	user,

	editMode: handleActions({
		[types.EDIT_MODE_TOGGLE]: state => !state,
	}, false),
});
