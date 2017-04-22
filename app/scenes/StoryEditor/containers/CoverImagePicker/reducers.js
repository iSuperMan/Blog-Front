import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { types } from './actions';

const loader = handleActions({
	[types.COVER_IMAGE_LOADER_SHOW]: () => true,
	[types.COVER_IMAGE_LOADER_HIDE]: () => false,
}, false);

export default combineReducers({
	loader,
});
