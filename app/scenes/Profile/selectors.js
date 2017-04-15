import _ from 'lodash';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getProfileScene, getEntities } from '../../selectors';
import { userSchema } from '../../services/entities/user';

export const getEditMode = createSelector(getProfileScene, scene => _.get(scene, 'editMode', false));
export const getIsUserFetching = createSelector(getProfileScene, scene => _.get(scene, 'user.isFetching', false));
export const getAvatarPicker = createSelector(getProfileScene, scene => _.get(scene, 'avatarPicker', {}));

export const getUser = createSelector(
  [getProfileScene, getEntities],

  (scene, entities) =>
    denormalize(_.get(scene, 'user.result', null), userSchema, entities),
);
