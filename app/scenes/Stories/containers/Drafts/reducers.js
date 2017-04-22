import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { stories as storiesAPI } from '../../../../services/api';

export default combineReducers({
	isFetching: handleActions({
		[storiesAPI.types.DRAFT_STORIES_BY_USER_REQUEST]: () => true,
		[storiesAPI.types.DRAFT_STORIES_BY_USER_SUCCESS]: () => false,
		[storiesAPI.types.DRAFT_STORIES_BY_USER_FAILURE]: () => false,
	}, false),

	result: handleActions({
		[storiesAPI.types.DRAFT_STORIES_BY_USER_SUCCESS]: (state, action) =>
      _.get(action, 'payload.result', []),

		[storiesAPI.types.DELETE_STORY_SUCCESS]: (state, action) =>
			state.filter(id => id !== action.meta.id),
	}, []),
});
