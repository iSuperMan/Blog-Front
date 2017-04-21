import keyMirror from 'keymirror';
import { createAction } from 'redux-actions';

export const types = keyMirror({
	STORY_EDITOR_RESET: null,
});

export const resetStoryEditor = createAction(types.STORY_EDITOR_RESET);
