import _ from 'lodash';
import { createSelector } from 'reselect';
import { getAvatarPicker } from '../../selectors';

export const getLoader = createSelector(getAvatarPicker, avatarPicker => _.get(avatarPicker, 'loader', false));
export default {};
