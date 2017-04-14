import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { types } from './actions';

export default combineReducers({
	header: combineReducers({
		shadow: handleActions({
			[types.UI_HEADER_SHADOW_HIDE]: () => false,
			[types.UI_HEADER_SHADOW_SHOW]: () => true,
		}, true),
	}),
});
