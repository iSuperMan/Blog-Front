import _ from 'lodash';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getAuth, getEntities } from '../../selectors';
import { userSchema } from '../entities/user';

export const getIsAuthenticated = createSelector(getAuth, auth => _.get(auth, 'isAuthenticated', false));
export const getIsPassed = createSelector(getAuth, auth => _.get(auth, 'isPassed', false));
export const getIsFetching = createSelector(getAuth, auth => _.get(auth, 'isFetching', false));

export const getUser = createSelector(
  [getAuth, getEntities],

  (auth, entities) =>
    denormalize(_.get(auth, 'user', null), userSchema, entities),
);
