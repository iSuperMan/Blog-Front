// @flow
import React from 'react';
import { connect } from 'react-redux';
import { actions as authActions, selectors as authSelectors } from '../../services/auth';
import { actions as entryDialogActions } from '../EntryDialog';
import Header from '../../components/Header';
import { selectors as UISelectors } from '../../services/ui';
import type { User } from '../../services/entities/user';

type LayoutProps = {
	user: User,
	isAuthenticated: boolean,
	children: any,
	resetAuthentication: () => void,
	openEntryDialog: () => void,
	headerShadow: boolean,
};

const Layout = (props: LayoutProps) => <div>
	<Header
		user={props.isAuthenticated ? props.user : null}
		signOutClickHanlder={props.resetAuthentication}
		signInClickHandler={props.openEntryDialog}
		shadow={props.headerShadow}
	/>

  {props.children}
</div>;

export default connect(
	state => ({
		user: authSelectors.getUser(state),
		isAuthenticated: authSelectors.getIsAuthenticated(state),
		headerShadow: UISelectors.getHeaderShadow(state),
	}),

	{
		resetAuthentication: authActions.resetAuthentication,
		openEntryDialog: entryDialogActions.openEntryDialog,
	},
)(Layout);
