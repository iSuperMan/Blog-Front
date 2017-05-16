import _ from 'lodash';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getEntities } from '../../../../selectors';
import { getPopularStories } from '../../selectors';
import { arrayOfStorySchemas } from '../../../../services/entities/story';

export const getIsFetching = createSelector(getPopularStories, stories => _.get(stories, 'isFetching', false));

export const getStories = createSelector(
  [getPopularStories, getEntities],

  (stories, entities) =>
    denormalize(stories.result, arrayOfStorySchemas, entities),
);
