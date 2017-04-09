// @flow
import React from 'react';
import { reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import InputField from '../../../../components/InputField';
import { isEmail, isRequired, maxLength, minLength, isAlphanumeric } from '../../../../services/validators';
import { users } from '../../../../services/api';

type SignUpFormProps = {
	handleSubmit: () => any,
	submitting: boolean,
	invalid: boolean,
	anyTouched: boolean,
}

const FORM_NAME = 'signUpForm';

const SignUpForm = (props: SignUpFormProps) => (
  <form>
		<InputField
			name="email"
			floatingLabelText="E-mail"
			type="email"
      fullWidth
			disabled={props.submitting}

			formName={FORM_NAME}
			asyncValidate={(value, dispatch) =>
				dispatch(users.actions.verifyAvailableEmail(value))
					.then(({ payload }) => {
						if (payload.result) {
							return Promise.resolve();
						}
						return Promise.reject(new Error('Email is not available'));
					})
			}

			validate={[
				/* eslint-disable no-confusing-arrow */
				val => !isRequired(val) ? 'Field should not be empty' : undefined,
				val => !isEmail(val) ? 'Field should contain valid email' : undefined,
				/* eslint-enable no-confusing-arrow */
			]}
		/>

		<InputField
			name="username"
			floatingLabelText="Username"
			fullWidth
			disabled={props.submitting}

			formName={FORM_NAME}
			asyncValidate={(value, dispatch) =>
				dispatch(users.actions.verifyAvailableUsername(value))
					.then(({ payload }) => {
						if (payload.result) {
							return Promise.resolve();
						}
						return Promise.reject(new Error('Username is not available'));
					})
			}

			validate={[
				/* eslint-disable no-confusing-arrow */
				val => !isRequired(val) ? 'Field should not be empty' : undefined,
				val => !isAlphanumeric(val) ? 'Field should contain only alphanum' : undefined,
				val => !minLength(5)(val) ? 'Field should contain not less than 5 chars' : undefined,
				val => !maxLength(30)(val) ? 'Field should contain not more than 30 chars' : undefined,
				/* eslint-enable no-confusing-arrow */
			]}
		/>

		<InputField
			name="fullName"
			floatingLabelText="Full Name"
			fullWidth
			disabled={props.submitting}

			validate={[
				/* eslint-disable no-confusing-arrow */
				val => !isRequired(val) ? 'Field should not be empty' : undefined,
				/* eslint-enable no-confusing-arrow */
			]}
		/>

		<InputField
			name="password"
			floatingLabelText="Password"
			type="password"
			fullWidth
			disabled={props.submitting}

			validate={[
				/* eslint-disable no-confusing-arrow */
				val => !isRequired(val) ? 'Field should not be empty' : undefined,
				val => !minLength(5)(val) ? 'Field should contain not less than 5 chars' : undefined,
				val => !maxLength(20)(val) ? 'Field should contain not more than 20 chars' : undefined,
				/* eslint-enable no-confusing-arrow */
			]}
		/>

		<InputField
			name="repeatPassword"
			floatingLabelText="Confirm password"
			type="password"
			fullWidth
			disabled={props.submitting}

			validate={[
				/* eslint-disable no-confusing-arrow */
				val => !isRequired(val) ? 'Field should not be empty' : undefined,
				/* eslint-enable no-confusing-arrow */
			]}
		/>

		<RaisedButton
			label="Create account"
			style={{ marginTop: 15 }}
			secondary
			fullWidth
			onTouchTap={props.handleSubmit}
			disabled={!props.anyTouched || props.invalid || props.submitting}
		/>
  </form>
);

const validate = (values) => {
	const errors = {};

	if (values.repeatPassword && values.repeatPassword !== values.password) {
		errors.repeatPassword = 'Passwords are not matching';
	}

	return errors;
};

export default reduxForm({
	form: FORM_NAME,
	touchOnBlur: false,
	touchOnChange: true,
	validate,
	asyncBlurFields: ['email', 'username'],
})(SignUpForm);
