import _ from 'lodash';
import { createSelector } from 'reselect';
import { getUserDetailsScene } from '../../selectors';

export const getEditMode = createSelector(getUserDetailsScene, scene => _.get(scene, 'editMode', false));
export const getAvatarPicker = createSelector(getUserDetailsScene, scene => _.get(scene, 'avatarPicker', {}));
