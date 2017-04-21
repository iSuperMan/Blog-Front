// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose, withHandlers, lifecycle } from 'recompose';
import { selectors as authSelectors } from '../../services/auth';

export default (ComposedComponent: any) => {
	type AuthenticatedComponentProps = {
		isAuthenticated: boolean,
	};

	const AuthenticatedComponent = (props: AuthenticatedComponentProps) => (
		props.isAuthenticated
			? <ComposedComponent {..._.omit(props, ['isAuthenticated'])} />
			: null
	);

	return compose(
		connect(
      state => ({ isAuthenticated: authSelectors.getIsAuthenticated(state) }),
    ),

		withRouter,

		withHandlers({
			checkAuth: () => (props) => {
				if (!props.isAuthenticated) {
					props.history.replace('/');
				}
			},
		}),

		lifecycle({
			componentDidMount() {
				this.props.checkAuth(this.props);
			},

			componentWillReceiveProps(nextProps) {
				this.props.checkAuth(nextProps);
			},
		}),
  )(AuthenticatedComponent);
};
