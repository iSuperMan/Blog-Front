// @flow
import React from 'react';
import Paper from 'material-ui/Paper';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import UserPreview from '../../components/UserPreview';
import { actions as UIActions } from '../../../../services/ui';
import { selectors as authSelectors } from '../../../../services/auth';
import type { User } from '../../../../services/entities/user';
import * as selectors from '../../selectors';
import * as actions from '../../actions';

type DetailsProps = {
	user: User,
	me: User | null,
	editMode: boolean,
	toggleEditMode: () => void,
};

const Details = (props: DetailsProps) => <Paper>
  <div className="container">
		<div className="row">
			<div className="col-sm-8 offset-sm-2">
				{props.editMode
					? 'Edit Mode'

					: <UserPreview
						user={props.user}
						me={props.me}
						onEditButtonClick={() => props.toggleEditMode()}
					/>
				}
			</div>
		</div>
  </div>
</Paper>;

export default compose(
	connect(
		state => ({
			editMode: selectors.getEditMode(state),
			me: authSelectors.getUser(state),
		}),

		{
			toggleEditMode: actions.toggleEditMode,
			hideHeaderShadow: UIActions.hideHeaderShadow,
			showHeaderShadow: UIActions.showHeaderShadow,
		},
	),

	lifecycle({
		componentWillMount() {
			this.props.hideHeaderShadow();
		},

		componentWillUnmount() {
			this.props.showHeaderShadow();
		},
	}),
)(Details);
