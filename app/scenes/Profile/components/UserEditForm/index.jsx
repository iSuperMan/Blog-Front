// @flow
import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import FlatButton from 'material-ui/FlatButton';
import { compose, withProps } from 'recompose';
import AvatarPicker from '../../containers/AvatarPicker';
import InputField from '../../../../components/InputField';
import UserStatistic from '../UserStatistic';
import { isRequired } from '../../../../services/validators';
import styles from './assets/styles.css';

type UserEditFormProps = {
	onCancelButtonClick: () => void,
	handleSubmit: () => any,
	submitting: boolean,
	invalid: boolean,
	dirty: boolean,
}

const UserEditForm = (props: UserEditFormProps) => (
  <div className={styles.userEditForm}>
		<form>
			<div className="row">
				<div className="col-sm-9">
					<InputField
						name="fullName"
						hintText="Enter your name"
						disabled={props.submitting}
						fullWidth
						style={{ fontSize: 32, fontWeight: 'bold' }}
						underlineStyle={{ border: 'none' }}

						validate={[
							/* eslint-disable no-confusing-arrow */
							val => !isRequired(val) ? 'Field should not be empty' : undefined,
							/* eslint-enable no-confusing-arrow */
						]}
					/>

					<InputField
						name="bio"
						hintText="Enter a short bio"
						disabled={props.submitting}
						fullWidth
						inputStyle={{ color: '#757575' }}
						style={{ fontSize: 16 }}
						underlineStyle={{ border: 'none' }}
						validate={[]}
					/>

					<UserStatistic followersAmount={29} followingAmount={938} />

					<x-user-actions>
						<FlatButton
							secondary
							onTouchTap={props.handleSubmit}
							disabled={!props.dirty || props.invalid || props.submitting}
              label="Save"
              style={{ borderColor: '#FF80AB', borderWidth: 1, borderStyle: 'solid', marginRight: 20 }}
						/>

						<FlatButton
              label="Cancel"
							disabled={props.submitting}
							onTouchTap={props.onCancelButtonClick}
              style={{ borderColor: '#424242', borderWidth: 1, borderStyle: 'solid' }}
						/>
					</x-user-actions>
				</div>

				<div className="col-sm-3">
					<x-avatar>
						<Field name="avatar" component={AvatarPicker} />
					</x-avatar>
				</div>
			</div>
		</form>
  </div>
);

export default compose(
	withProps(({ user }) => ({
		initialValues: {
			..._.pick(user, ['fullName', 'bio']),
			avatar: _.get(user, 'avatar._id'),
		},
	})),

	reduxForm({
		form: 'userEditForm',
		touchOnBlur: false,
		touchOnChange: true,
	}),
)(UserEditForm);
