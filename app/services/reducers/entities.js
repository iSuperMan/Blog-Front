import merge from 'lodash/merge';

export default (state = {}, action) => {
	if (action.payload && action.payload.entities) {
		return merge({}, state, action.payload.entities);
	}

	if (action.meta && action.meta.delete) {
		// clone object except one key
		const cloningEntity = Object.assign({}, state[action.meta.entity]);
		delete cloningEntity[action.meta.id];

		return {
			...state,
			[action.meta.entity]: cloningEntity,
		};
	}

	return state;
};
