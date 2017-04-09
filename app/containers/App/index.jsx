// @flow
import React from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Home from '../../components/Home';
import Profile from '../../components/Profile';
import Layout from '../Layout';
import EntryDialog from '../EntryDialog';
import AuthenticatedComponent from '../AuthenticatedComponent';
import { auth as authAPI } from '../../services/api';
import { actions as authActions, selectors as authSelectors } from '../../services/auth';
import { token } from '../../services/helpers';

type AppProps = {
	isAuthFetching: boolean,
	isAuthPassed: boolean,
}

const App = (props: AppProps) => {
	if (props.isAuthPassed && !props.isAuthFetching) {
		return (
			<Layout>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/profile" component={AuthenticatedComponent(Profile)} />
				</Switch>

				<EntryDialog />
			</Layout>
		);
	}

	return null;
};

export default compose(
	connect(
		state => ({
			isAuthFetching: authSelectors.getIsFetching(state),
			isAuthPassed: authSelectors.getIsPassed(state),
			authUser: authSelectors.getUser(state),
			isAuthenticated: authSelectors.getIsAuthenticated(state),
		}),

		{
			getMe: authAPI.actions.getMe,
			passAuthentication: authActions.passAuthentication,
		},

		null,
		{ pure: false },
	),

	lifecycle({
		componentDidMount() {
			if (token.isHas()) {
				this.props.getMe();
			} else {
				this.props.passAuthentication();
			}
		},
	}),
)(App);
