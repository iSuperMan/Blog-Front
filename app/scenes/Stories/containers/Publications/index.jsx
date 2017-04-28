// @flow
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';
import { withRouter } from 'react-router';
import StoriesList from '../../components/StoriesList';
import reducers from './reducers';
import * as selectors from './selectors';
import { stories as storiesAPI } from '../../../../services/api';
import { selectors as authSelectors } from '../../../../services/auth';
import { actions as deleteConfirmDialogActions } from '../DeleteStoryConfirmDialog';

export { reducers };

export default compose(
	connect(
		state => ({
			stories: selectors.getStories(state),
			isFetching: selectors.getIsFetching(state),
			user: authSelectors.getUser(state),
		}),

		{
			getPublishedStoriesByUser: storiesAPI.actions.getPublishedStoriesByUser,
			openDeleteConfirmDialog: deleteConfirmDialogActions.openDeleteConfirmDialog,
		},
	),

	withRouter,

	withHandlers({
		deleteClickHandleCreator: props => story => () => props.openDeleteConfirmDialog(story._id),
		editClickHandleCreator: props => story => () => props.history.push(`/p/${story._id}`),
		itemClickHandleCreator: props => story => () => props.history.push(`/@${story._author.username}/${story._id}`),
	}),

	lifecycle({
		componentDidMount() {
			this.props.getPublishedStoriesByUser(this.props.user._id);
		},
	}),
)(StoriesList);
