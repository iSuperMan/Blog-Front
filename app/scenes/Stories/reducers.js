import { combineReducers } from 'redux';
import { reducers as drafts } from './containers/Drafts';
import { reducers as publications } from './containers/Publications';
import { reducers as deleteStoryConfirmDialog } from './containers/DeleteStoryConfirmDialog';

export default combineReducers({
	deleteStoryConfirmDialog,
	drafts,
	publications,
});
