import { createSelector } from 'reselect';
import { getStoriesScene } from '../../selectors';

export const getDrafts = createSelector(getStoriesScene, scene => scene.drafts);
export const getPublications = createSelector(getStoriesScene, scene => scene.publications);

export const getDeleteStoryConfirmDialog = createSelector(
  getStoriesScene,
  scene => scene.deleteStoryConfirmDialog,
);
