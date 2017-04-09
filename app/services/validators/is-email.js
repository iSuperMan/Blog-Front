import _ from 'lodash';

/* eslint-disable no-useless-escape */
export default value => _.isEmpty(value)
	|| value.match(new RegExp('^(([^<>()[\\]\\.,;:\\s@\"]+(\\.[^<>()[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@' +
	'((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'));
/* eslint-enable no-useless-escape */
