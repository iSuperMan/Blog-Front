import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { stories as storiesAPI } from '../../services/api';
import { reducers as coverImagePicker } from './containers/CoverImagePicker';
import { types } from './actions';

const getStoryFromAction = (state, action) => _.get(action, 'payload.result', null);

export default combineReducers({
	story: handleActions({
		[storiesAPI.types.GET_STORY_SUCCESS]: getStoryFromAction,
		[storiesAPI.types.CREATE_STORY_SUCCESS]: getStoryFromAction,
		[storiesAPI.types.UPDATE_STORY_SUCCESS]: getStoryFromAction,
		[types.STORY_EDITOR_RESET]: () => null,
	}, null),

	isSaving: handleActions({
		[storiesAPI.types.CREATE_STORY_REQUEST]: () => true,
		[storiesAPI.types.UPDATE_STORY_REQUEST]: () => true,
		[storiesAPI.types.CREATE_STORY_SUCCESS]: () => false,
		[storiesAPI.types.UPDATE_STORY_SUCCESS]: () => false,
		[storiesAPI.types.CREATE_STORY_FAILURE]: () => false,
		[storiesAPI.types.UPDATE_STORY_FAILURE]: () => false,
	}, false),

	isFetching: handleActions({
		[storiesAPI.types.GET_STORY_REQUEST]: () => true,
		[storiesAPI.types.GET_STORY_SUCCESS]: () => false,
		[storiesAPI.types.GET_STORY_FAILURE]: () => false,
	}, false),

	coverImagePicker,
});
