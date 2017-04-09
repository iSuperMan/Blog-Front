// @flow
import React from 'react';
import Dialog from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { InternalError } from 'redux-api-middleware';
import { compose, withHandlers } from 'recompose';
import { getIsOpen, getIsSignUpForm } from './selectors';
import * as actions from './actions';
import reducers from './reducers';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import { auth } from '../../services/api';
import styles from './assets/styles.css';

type LoginDialogProps = {
	isOpen: boolean,
	isSignUpForm: boolean,
	closeEntryDialog: () => void,
	toggleForm: (mixed) => void,
	signUpFormSubmitHandler: ({}) => Promise<any>,
	signInFormSubmitHandler: ({}) => Promise<any>,
}

const EntiryDialog = (props: LoginDialogProps) => (
	<Dialog
		title={props.isSignUpForm ? 'Sign up' : 'Sign in'}
		open={props.isOpen}
		onRequestClose={props.closeEntryDialog}
		titleStyle={{ textAlign: 'center', backgroundColor: '#F5F5F5', color: '#424242' }}
		contentStyle={{ width: 500 }}
		autoScrollBodyContent
	>
		{ props.isSignUpForm
			? <SignUpForm onSubmit={props.signUpFormSubmitHandler} />
			: <SignInForm onSubmit={props.signInFormSubmitHandler} />
		}

		<div className={styles.toggleForm}>
			<a href="" onClick={props.toggleForm}>
				{props.isSignUpForm ? 'or try to Sign in' : 'or try to Sign up'}
			</a>
		</div>
	</Dialog>
);

export { actions, reducers };

export default compose(
	connect(
		state => ({
			isOpen: getIsOpen(state),
			isSignUpForm: getIsSignUpForm(state),
		}),

		{
			closeEntryDialog: actions.closeEntryDialog,
			signUp: auth.actions.signUp,
			signIn: auth.actions.signIn,
			toggleEntryDialogForm: actions.toggleEntryDialogForm,
		},
	),

	withHandlers({
		toggleForm: props => (e) => {
			e.preventDefault();
			props.toggleEntryDialogForm();
		},

		signUpFormSubmitHandler: props => data => props.signUp(data)
			.then(() => props.closeEntryDialog()),

		signInFormSubmitHandler: props => data => props.signIn(data)
			.then(({ error, payload }) => {
				if (error) {
					return Promise.reject(
						payload instanceof InternalError
						? new SubmissionError({ password: payload.message })
						: payload,
					);
				}

				return props.closeEntryDialog();
			}),
	}),
)(EntiryDialog);
