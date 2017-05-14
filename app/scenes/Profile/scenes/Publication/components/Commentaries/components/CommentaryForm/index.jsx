// @flow
import React from 'react';
import { reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import InputField from '../../../../../../../../components/InputField';
import { isRequired } from '../../../../../../../../services/validators';

type CommentaryFormProps = {
	handleSubmit: () => any,
	submitting: boolean,
	invalid: boolean,
	anyTouched: boolean,
}

const CommentaryForm = (props: CommentaryFormProps) => (
  <form>
		<InputField
			name="body"
			floatingLabelText="Write a response"
			type="text"
      fullWidth
			hideError
			disabled={props.submitting}
			multiLine
      rows={2}

			validate={[
				/* eslint-disable no-confusing-arrow */
				val => !isRequired(val) ? 'Fail' : undefined,
				/* eslint-enable no-confusing-arrow */
			]}
		/>

		<RaisedButton
			label="Send"
			style={{ marginTop: 15 }}
			primary
			fullWidth
			onTouchTap={props.handleSubmit}
			disabled={!props.anyTouched || props.invalid || props.submitting}
		/>
  </form>
);

export default reduxForm({
	form: 'commetaryForm',
	touchOnBlur: false,
	touchOnChange: true,
})(CommentaryForm);
