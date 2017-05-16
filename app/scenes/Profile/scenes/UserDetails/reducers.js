import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducers as avatarPicker } from './containers/AvatarPicker';
import { reducers as latestStories } from './containers/LatestStoriesList';
import { reducers as recommendsStories } from './containers/RecommendsStoriesList';
import { types } from './actions';

export default combineReducers({
	avatarPicker,
	latestStories,
	recommendsStories,

	editMode: handleActions({
		[types.EDIT_MODE_TOGGLE]: state => !state,
	}, false),
});
