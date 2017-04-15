import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { types } from './actions';

const loader = handleActions({
	[types.AVATAR_UPLOAD_LOADER_SHOW]: () => true,
	[types.AVATAR_UPLOAD_LOADER_HIDE]: () => false,
}, false);

export default combineReducers({
	loader,
});
