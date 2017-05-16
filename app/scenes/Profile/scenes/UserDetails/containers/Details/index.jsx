// @flow
import React from 'react';
import Paper from 'material-ui/Paper';
import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import UserPreview from '../../components/UserPreview';
import UserEditForm from '../../components/UserEditForm';
import Navbar from '../../components/Navbar';
import StoriesLists from '../../components/StoriesLists';
import { actions as UIActions } from '../../../../../../services/ui';
import { selectors as authSelectors } from '../../../../../../services/auth';
import { users } from '../../../../../../services/api';
import type { User } from '../../../../../../services/entities/user';
import { actions as entryDialogActions } from '../../../../../../containers/EntryDialog';
import * as selectors from '../../selectors';
import * as actions from '../../actions';

type DetailsProps = {
	user: User,
	me: User | null,
	editMode: boolean,
	toggleEditMode: () => void,
	onEditFormSubmit: () => void,
	openEntryDialog: () => void,
	followToUser: (userId: string) => void,
	unfollowToUser: (userId: string) => void,
};

const Details = (props: DetailsProps) => <div>
	<Paper>
		<div className="container">
			<div className="row">
				<div className="col-sm-8 offset-sm-2">
					{props.editMode
						? <UserEditForm
							onSubmit={props.onEditFormSubmit}
							user={props.user}
							onCancelButtonClick={() => props.toggleEditMode()}
						/>

						: <UserPreview
							user={props.user}
							me={props.me}
							onEditButtonClick={() => props.toggleEditMode()}
							openEntryDialog={props.openEntryDialog}
							followToUser={props.followToUser}
							unfollowToUser={props.unfollowToUser}
						/>
					}
				</div>
			</div>

			<div className="row">
				<div className="col-sm-8 offset-sm-2">
					<Navbar basePath={`/@${props.user.username}`} />
				</div>
			</div>
		</div>
	</Paper>

	<StoriesLists basePath={`/@${props.user.username}`} user={props.user} />
</div>;

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
			updateUser: users.actions.updateUser,
			followToUser: users.actions.followToUser,
			unfollowToUser: users.actions.unfollowToUser,
			openEntryDialog: entryDialogActions.openEntryDialog,
		},
	),

	withHandlers({
		onEditFormSubmit: ({ user, updateUser, toggleEditMode }) => data =>
			updateUser({ userId: user._id, data })
				.then(() => toggleEditMode()),
	}),

	lifecycle({
		componentWillMount() {
			this.props.hideHeaderShadow();
		},

		componentWillUnmount() {
			this.props.showHeaderShadow();
		},
	}),
)(Details);
