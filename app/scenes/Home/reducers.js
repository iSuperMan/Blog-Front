import { combineReducers } from 'redux';
import { reducers as latestStories } from './containers/LatestStoriesList';

export default combineReducers({
	latestStories,
});
