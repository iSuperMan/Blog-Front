// @flow
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { getIsFetching, getStories } from './selectors';
import reducers from './reducers';
import StoriesList from '../../../../components/StoriesList';
import { stories } from '../../../../services/api';
import { selectors as authSelectors } from '../../../../services/auth';
import { actions as entryDialogActions } from '../../../../containers/EntryDialog';

export { reducers };

export default compose(
	connect(
		state => ({
			isFetching: getIsFetching(state),
			stories: getStories(state),
			me: authSelectors.getUser(state),
		}),

		{
			getStories: stories.actions.getLatestsStories,
			likeStory: stories.actions.likeStory,
			unlikeStory: stories.actions.unlikeStory,
			openEntryDialog: entryDialogActions.openEntryDialog,
		},
	),

	lifecycle({
		componentDidMount() {
			this.props.getStories();
		},
	}),
)(StoriesList);
