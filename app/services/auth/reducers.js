import { handleActions } from 'redux-actions';
import { auth } from '../api';
import { token as tokenHelper } from '../helpers';
import { types } from './actions';

const acceptUser = (state, action) => {
	if (action.error) {
		return state;
	}

	const { token, result } = action.payload;
	tokenHelper.set(token);

	return {
		...state,
		isAuthenticated: true,
		user: result,
	};
};

export default handleActions({
	[auth.types.SIGNUP_SUCCESS]: acceptUser,
	[auth.types.SIGNIN_SUCCESS]: acceptUser,

	[auth.types.ME_REQUEST]: state => ({
		...state,
		isFetching: true,
	}),

	[auth.types.ME_SUCCESS]: (state, { payload }) => ({
		...state,
		isAuthenticated: true,
		user: payload.result,
		isFetching: false,
		isPassed: true,
	}),

	[auth.types.ME_FAILURE]: state => ({
		...state,
		isFetching: false,
		isPassed: true,
	}),

	[types.AUTHENTICATION_PASS]: state => ({
		...state,
		isPassed: true,
	}),

	[types.AUTHENTICATION_RESET]: (state) => {
		tokenHelper.remove();

		return {
			...state,
			isAuthenticated: false,
			user: null,
		};
	},
}, {
	isAuthenticated: false,
	user: null,
	isPassed: false,
	isFetching: false,
});
