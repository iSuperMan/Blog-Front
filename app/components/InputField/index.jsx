// @flow
import React from 'react';
import _ from 'lodash';
import { Field, startAsyncValidation, stopAsyncValidation } from 'redux-form';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { compose, lifecycle, defaultProps, withHandlers } from 'recompose';

type InputFieldProps = {
	fullWidth?: boolean,
	floatingLabelText?: string,
	hintText? : string,
	name: string,
  type?: string,
	disabled? : boolean,
	asyncValidate?: (value: mixed, dispatch: () => void) => Promise<any>,
	formName?: string,
};

type RenderComponentProps = {
	input: {
		name: string,
		value: string,
		onChange: () => void,
	},
	meta: {
		touched: boolean,
		error: ?string,
	},
	floatingLabelText: ?string,
	hintText: ?string,
	type: string,
	fullWidth: boolean,
	disabled: boolean
}

const InputField = (props: InputFieldProps) => <Field
	{...props}

	component={(renderProps: RenderComponentProps) => <TextField
		{..._.omit(renderProps, ['meta', 'input'])}
		{...renderProps.input}
		disabled={renderProps.disabled}
		type={renderProps.type}
		errorText={renderProps.meta.touched && renderProps.meta.error}
	/>}
/>;

export default compose(
	connect(), // grab dispatch function

	defaultProps({
		type: 'text',
		floatingLabelText: null,
		hintText: null,
		fullWidth: false,
		disabled: false,
		validate: [],
	}),

	lifecycle({
		shouldComponentUpdate() { return false; },
	}),

	withHandlers({
		onChange: props => (e, currVal) => {
			const errors = props.validate.map(validator => validator(currVal)).filter(val => val);

			if (!errors.length && _.isFunction(props.asyncValidate)) {
				props.dispatch(startAsyncValidation(props.formName));

				props.asyncValidate(currVal, props.dispatch)
					.then(() => props.dispatch(stopAsyncValidation(props.formName, {})))
					.catch(error => props.dispatch(stopAsyncValidation(
						props.formName,
						{ [props.name]: error.message },
					)));
			}
		},
	}),
)(InputField);
