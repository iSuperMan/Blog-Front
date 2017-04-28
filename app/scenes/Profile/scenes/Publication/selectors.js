import _ from 'lodash';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getEntities } from '../../../../selectors';
import { getPublicationScene } from '../../selectors';
import { storySchema } from '../../../../services/entities/story';

export const getIsPublicationFetching = createSelector(getPublicationScene, scene => _.get(scene, 'publication.isFetching', false));

export const getPublication = createSelector(
  [getPublicationScene, getEntities],

  (scene, entities) =>
    denormalize(_.get(scene, 'publication.result', null), storySchema, entities),
);
