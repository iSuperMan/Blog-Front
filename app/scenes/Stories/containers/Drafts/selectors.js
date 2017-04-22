import _ from 'lodash';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getEntities } from '../../../../selectors';
import { getDrafts } from '../../selectors';
import { arrayOfStorySchemas } from '../../../../services/entities/story';

export const getIsFetching = createSelector(getDrafts, drafts => _.get(drafts, 'isFetching', false));

export const getStories = createSelector(
  [getDrafts, getEntities],

  (drafts, entities) =>
    denormalize(drafts.result, arrayOfStorySchemas, entities),
);
