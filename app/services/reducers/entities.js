import _ from 'lodash';

export default (state = {}, action) => {
	if (action.payload && action.payload.entities) {
		/* eslint-disable consistent-return */
		return _.mergeWith({}, state, action.payload.entities, (objValue, srcValue) => {
			if (_.isArray(srcValue)) {
				return [...srcValue];
			}
		});
		/* eslint-enable consistent-return */
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
