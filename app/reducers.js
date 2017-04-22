import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as router } from 'react-router-redux';
import { reducers as entryDialog } from './containers/EntryDialog';
import { entities } from './services/reducers';
import { reducers as auth } from './services/auth';
import { reducers as ui } from './services/ui';
import { reducers as profileScene } from './scenes/Profile';
import { reducers as storyEditorScene } from './scenes/StoryEditor';
import { reducers as storiesScene } from './scenes/Stories';

const reducers = combineReducers({
	auth,
	entities,
	entryDialog,
	form,
	router,
	ui,
	profileScene,
	storiesScene,
	storyEditorScene,
});

export default reducers;
