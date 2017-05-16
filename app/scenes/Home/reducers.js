import { combineReducers } from 'redux';
import { reducers as latestStories } from './containers/LatestStoriesList';
import { reducers as popularStories } from './containers/PopularStoriesList';

export default combineReducers({
	latestStories,
	popularStories,
});
