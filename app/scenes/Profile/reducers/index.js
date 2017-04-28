import { combineReducers } from 'redux';
import user from './user';
import { reducers as userDetailsScene } from '../scenes/UserDetails';
import { reducers as publicationScene } from '../scenes/Publication';

export default combineReducers({
	user,
	userDetailsScene,
	publicationScene,
});
