import _ from 'lodash';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getEntities } from '../../../../../../selectors';
import { getLatestStories } from '../../selectors';
import { arrayOfStorySchemas } from '.././../../../../../services/entities/story';

export const getIsFetching = createSelector(getLatestStories, stories => _.get(stories, 'isFetching', false));

export const getStories = createSelector(
  [getLatestStories, getEntities],

  (stories, entities) =>
    denormalize(stories.result, arrayOfStorySchemas, entities),
);
