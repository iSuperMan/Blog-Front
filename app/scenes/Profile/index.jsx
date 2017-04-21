// @flow
import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import Details from './containers/Details';
import reducers from './reducers';
import { getIsUserFetching, getUser } from './selectors';
import type { User } from '../../services/entities/user';
import { users as usersAPI } from '../../services/api';

type ProfileProps = {
	isUserFetching: boolean,
	user: User | null,
};

const Profile = (props: ProfileProps) => {
	if (props.isUserFetching || !props.user) {
		return null;
	}

	return <Details user={props.user} />;
};

export { reducers };

export default compose(
	connect(
		state => ({
			isUserFetching: getIsUserFetching(state),
			user: getUser(state),
		}),

		{
			fetchUserByUsername: usersAPI.actions.fetchUserByUsername,
		},
	),

	lifecycle({
		componentDidMount() {
			this.props.fetchUserByUsername(this.props.match.params.username, { source: 'profile' });
		},
	}),
)(Profile);
