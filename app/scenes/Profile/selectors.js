import _ from 'lodash';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getProfileScene, getEntities } from '../../selectors';
import { userSchema } from '../../services/entities/user';

export const getIsUserFetching = createSelector(getProfileScene, scene => _.get(scene, 'user.isFetching', false));

export const getUser = createSelector(
  [getProfileScene, getEntities],

  (scene, entities) =>
    denormalize(_.get(scene, 'user.result', null), userSchema, entities),
);

export const getUserDetailsScene = createSelector(getProfileScene, scene => _.get(scene, 'userDetailsScene'));
export const getPublicationScene = createSelector(getProfileScene, scene => _.get(scene, 'publicationScene'));
