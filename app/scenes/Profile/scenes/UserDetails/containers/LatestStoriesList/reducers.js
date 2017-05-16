import { handleActions } from 'redux-actions';
import { stories } from '.././../../../../../services/api';

export default handleActions({
	[stories.types.PUBLISHED_STORIES_BY_USER_REQUEST]: state => ({
		...state,
		isFetching: true,
	}),

	[stories.types.PUBLISHED_STORIES_BY_USER_FAILURE]: state => ({
		...state,
		isFetching: false,
	}),

	[stories.types.PUBLISHED_STORIES_BY_USER_SUCCESS]: (state, action) => ({
		...state,
		isFetching: false,
		result: action.payload.result,
	}),
}, {
	isFetching: false,
	result: [],
});
