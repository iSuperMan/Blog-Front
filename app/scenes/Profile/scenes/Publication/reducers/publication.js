import { handleActions } from 'redux-actions';
import _ from 'lodash';
import { stories } from '../../../../../services/api';

export default handleActions({
	[stories.types.GET_PUBLICATION_REQUEST]: state => ({
		...state,
		isFetching: true,
	}),

	[stories.types.GET_PUBLICATION_SUCCESS]: (state, action) => ({
		...state,
		result: _.get(action, 'payload.result', null),
		isFetching: false,
	}),

	[stories.types.GET_PUBLICATION_FAILURE]: state => ({
		...state,
		isFetching: false,
	}),
}, {
	result: null,
	isFetching: false,
});
