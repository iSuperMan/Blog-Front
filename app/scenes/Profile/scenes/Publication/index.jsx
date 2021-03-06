// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { compose, lifecycle, withProps } from 'recompose';
import { stories } from '../../../../services/api';
import reducers from './reducers';
import * as selectors from './selectors';
import type { Story } from '../../../../services/entities/story';
import Details from './containers/Details';
import Commentaries from './components/Commentaries';
import { selectors as authSelectors } from '../../../../services/auth';

type PublicationProps = {
	isFetching: boolean,
	publication: Story,
	isCanEdit: boolean,
};

const Publication = (props: PublicationProps) => {
	if (props.isFetching || !props.publication) {
		return null;
	}

	return (<div>
		<Details publication={props.publication} isCanEdit={props.isCanEdit} />
		<Commentaries publication={props.publication} />
	</div>);
};

export { reducers };

export default compose(
  connect(
		state => ({
			isFetching: selectors.getIsPublicationFetching(state),
			publication: selectors.getPublication(state),
			me: authSelectors.getUser(state),
		}),

    { getPublication: stories.actions.getPublication },
  ),

	withProps(
		({ publication, me }) => ({
			isCanEdit: publication && _.get(me, '_id') === publication._author._id,
		}),
	),

	lifecycle({
		componentDidMount() {
			this.props.getPublication(this.props.match.params.publicationId);
		},
	}),
)(Publication);
