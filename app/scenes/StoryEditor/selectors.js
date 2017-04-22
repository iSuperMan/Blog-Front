import _ from 'lodash';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getStoryEditorScene, getEntities } from '../../selectors';
import { storySchema } from '../../services/entities/story';

export const getIsSaving = createSelector(getStoryEditorScene, scene => _.get(scene, 'isSaving', false));
export const getIsFetching = createSelector(getStoryEditorScene, scene => _.get(scene, 'isFetching', false));

export const getCoverImagePicker = createSelector(
  getStoryEditorScene,
  scene => scene.coverImagePicker,
);

export const getStory = createSelector(
  [getStoryEditorScene, getEntities],

  (scene, entities) =>
    denormalize(scene.story, storySchema, entities),
);
