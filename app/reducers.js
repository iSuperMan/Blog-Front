import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as router } from 'react-router-redux';
import { reducers as entryDialog } from './containers/EntryDialog';
import { entities } from './services/reducers';
import { reducers as auth } from './services/auth';

const reducers = combineReducers({
	auth,
	entities,
	entryDialog,
	form,
	router,
});

export default reducers;
