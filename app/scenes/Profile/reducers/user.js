import { handleActions } from 'redux-actions';
import _ from 'lodash';
import { users } from '../../../services/api';

const isMetaMatch = action => _.get(action, 'meta.source') === 'profile';

export default handleActions({
	[users.types.GET_USER_BY_USERNAME_REQUEST]: (state, action) => {
		if (!isMetaMatch(action)) {
			return state;
		}

		return {
			...state,
			isFetching: true,
		};
	},
	[users.types.GET_USER_BY_USERNAME_SUCCESS]: (state, action) => {
		if (!isMetaMatch(action)) {
			return state;
		}

		return {
			...state,
			result: _.get(action, 'payload.result', null),
			isFetching: false,
		};
	},
	[users.types.GET_USER_BY_USERNAME_FAILURE]: (state, action) => {
		if (!isMetaMatch(action)) {
			return state;
		}

		return {
			...state,
			isFetching: false,
		};
	},
}, {
	result: null,
	isFetching: false,
});
