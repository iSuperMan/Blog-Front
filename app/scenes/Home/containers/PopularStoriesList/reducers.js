import { handleActions } from 'redux-actions';
import { stories } from '../../../../services/api';

export default handleActions({
	[stories.types.POPULAR_STORIES_REQUEST]: state => ({
		...state,
		isFetching: true,
	}),

	[stories.types.POPULAR_STORIES_FAILURE]: state => ({
		...state,
		isFetching: false,
	}),

	[stories.types.POPULAR_STORIES_SUCCESS]: (state, action) => ({
		...state,
		isFetching: false,
		result: action.payload.result,
	}),
}, {
	isFetching: false,
	result: [],
});
