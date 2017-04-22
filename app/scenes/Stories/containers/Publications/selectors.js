import _ from 'lodash';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getEntities } from '../../../../selectors';
import { getPublications } from '../../selectors';
import { arrayOfStorySchemas } from '../../../../services/entities/story';

export const getIsFetching = createSelector(getPublications, publications => _.get(publications, 'isFetching', false));

export const getStories = createSelector(
  [getPublications, getEntities],

  (publications, entities) =>
    denormalize(publications.result, arrayOfStorySchemas, entities),
);
