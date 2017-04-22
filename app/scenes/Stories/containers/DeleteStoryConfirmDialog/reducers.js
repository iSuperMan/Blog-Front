import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { types } from './actions';

export default combineReducers({
	isOpen: handleActions({
		[types.DELETE_STORY_CONFIRMATION_DIALOG_OPEN]: () => true,
		[types.DELETE_STORY_CONFIRMATION_DIALOG_CLOSE]: () => false,
	}, false),

	storyId: handleActions({
		[types.DELETE_STORY_CONFIRMATION_DIALOG_OPEN]: (state, action) => action.payload.storyId,
		[types.DELETE_STORY_CONFIRMATION_DIALOG_CLOSE]: () => null,
	}, null),
});
