// @flow
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { getIsFetching, getStories } from './selectors';
import reducers from './reducers';
import StoriesList from '../../../../components/StoriesList';
import { stories } from '../../../../services/api';

export { reducers };

export default compose(
	connect(
		state => ({
			isFetching: getIsFetching(state),
			stories: getStories(state),
		}),

		{ getStories: stories.actions.getLatestsStories },
	),

	lifecycle({
		componentDidMount() {
			this.props.getStories();
		},
	}),
)(StoriesList);
