import { createSelector } from 'reselect';
import { getHomeScene } from '../../selectors';

export const getLatestStories = createSelector(getHomeScene, scene => scene.latestStories);
export const getPopularStories = createSelector(getHomeScene, scene => scene.popularStories);
