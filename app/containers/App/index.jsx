// @flow
import React from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Layout from '../Layout';
import EntryDialog from '../EntryDialog';
import AuthenticatedComponent from '../AuthenticatedComponent';
import StoryEditor from '../../scenes/StoryEditor';
import Profile from '../../scenes/Profile';
import Stories from '../../scenes/Stories';
import Home from '../../scenes/Home';
import { auth as authAPI } from '../../services/api';
import { actions as authActions, selectors as authSelectors } from '../../services/auth';
import { token } from '../../services/helpers';

const AuthenticatedStoryEditor = AuthenticatedComponent(StoryEditor);
const AuthenticatedStories = AuthenticatedComponent(Stories);

type AppProps = {
	isAuthPassed: boolean,
}

const App = (props: AppProps) => {
	if (props.isAuthPassed) {
		return (
			<Layout>
				<Switch>
					<Route exact path="/new-story" component={AuthenticatedStoryEditor} />
					<Route path="/p/:storyId" component={AuthenticatedStoryEditor} />
					<Route path="/me/stories" component={AuthenticatedStories} />
					<Route path="/@:username" component={Profile} />
					<Route path="/" component={Home} />
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
