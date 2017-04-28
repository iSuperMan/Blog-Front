import _ from 'lodash';

export default (state = {}, action) => {
	if (action.payload && action.payload.entities) {
		const cloneState = _.assign({}, state);

		_.forEach(_.keys(action.payload.entities), (entityName) => {
			cloneState[entityName] = cloneState[entityName]
				? _.assign(
					{},
					cloneState[entityName],
					action.payload.entities[entityName],
				)

				: action.payload.entities[entityName];
		});

		return cloneState;
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
