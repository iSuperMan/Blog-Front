// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import * as actions from './actions';
import * as selectors from './selectors';
import reducers from './reducers';
import { stories as storiesAPI } from '../../../../services/api';

type DeleteStoryConfirmDialogProps = {
	isOpen: boolean,
	closeDialog: () => void,
	onConfirm: () => void,
}

const DeleteStoryConfirmDialog = (props: DeleteStoryConfirmDialogProps) => <Dialog
	actions={[
		<FlatButton
      label="Cancel"
      primary
      onTouchTap={props.closeDialog}
		/>,

		<FlatButton
      label="Delete"
      primary
			onTouchTap={props.onConfirm}
		/>,
	]}

  modal={false}
  open={props.isOpen}
  onRequestClose={props.closeDialog}
>
  You are sure want delete story ?
</Dialog>;

export { actions, reducers };

export default compose(
	connect(
		state => ({
			isOpen: selectors.getIsOpen(state),
			storyId: selectors.getStoryId(state),
		}),

		{
			closeDialog: actions.closeDeleteConfirmDialog,
			deleteStory: storiesAPI.actions.deleteStory,
		},
	),

	withHandlers({
		onConfirm: props => () => {
			if (props.storyId) {
				props.deleteStory(props.storyId)
					.then(() => props.closeDialog());
			}
		},
	}),
)(DeleteStoryConfirmDialog);
