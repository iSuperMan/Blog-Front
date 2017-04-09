// @flow
import React from 'react';
import { reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import InputField from '../../../../components/InputField';
import { isEmail, isRequired } from '../../../../services/validators';

type SignInFormProps = {
	handleSubmit: () => any,
	submitting: boolean,
	invalid: boolean,
	anyTouched: boolean,
}

const SignInForm = (props: SignInFormProps) => (
  <form>
		<InputField
			name="email"
			floatingLabelText="E-mail"
			type="email"
      fullWidth
			disabled={props.submitting}

			validate={[
				/* eslint-disable no-confusing-arrow */
				val => !isRequired(val) ? 'Field should not be empty' : undefined,
				val => !isEmail(val) ? 'Field should contain valid email' : undefined,
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
				/* eslint-enable no-confusing-arrow */
			]}
		/>

		<RaisedButton
			label="Submit"
			style={{ marginTop: 15 }}
			primary
			fullWidth
			onTouchTap={props.handleSubmit}
			disabled={!props.anyTouched || props.invalid || props.submitting}
		/>
  </form>
);

export default reduxForm({
	form: 'signInForm',
	touchOnBlur: false,
	touchOnChange: true,
})(SignInForm);
