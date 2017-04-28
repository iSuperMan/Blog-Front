import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducers as avatarPicker } from './containers/AvatarPicker';
import { types } from './actions';

export default combineReducers({
	avatarPicker,

	editMode: handleActions({
		[types.EDIT_MODE_TOGGLE]: state => !state,
	}, false),
});
