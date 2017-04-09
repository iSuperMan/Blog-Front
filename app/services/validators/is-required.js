import _ from 'lodash';

export default (value) => {
	if (_.isUndefined(value)) {
		return false;
	}

	if (_.isString(value)) {
		return Boolean(value.length);
	}

	if (_.isArray(value) || _.isObject(value)) {
		return !_.isEmpty(value);
	}

	if (_.isNumber(value)) {
		return true;
	}

	return false;
};
