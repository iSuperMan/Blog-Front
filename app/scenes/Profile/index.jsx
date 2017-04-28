// @flow
import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import UserDetails from './scenes/UserDetails';
import reducers from './reducers';
import { getIsUserFetching, getUser } from './selectors';
import type { User } from '../../services/entities/user';
import { users as usersAPI } from '../../services/api';
import Publication from './scenes/Publication';

type ProfileProps = {
	isUserFetching: boolean,
	user: User | null,
	match: {
		path: string,
	},
};

const Profile = (props: ProfileProps) => {
	if (props.isUserFetching || !props.user) {
		return null;
	}

	return (
		<Switch>
			<Route
				exact
				path={props.match.path}
				render={() => <UserDetails user={props.user} />}
			/>

			<Route path={`${props.match.path}/:publicationId`} component={Publication} />
		</Switch>
	);
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
