// @flow
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

type PublishConfirmDialogProps = {
	isOpen: boolean,
  onConfirm: () => void,
  onCancel: () => void,
}

const PublishConfirmDialog = (props: PublishConfirmDialogProps) => <Dialog
	actions={[
		<FlatButton
      label="Cancel"
      primary
      onTouchTap={props.onCancel}
		/>,

		<FlatButton
      label="Publish"
      primary
			onTouchTap={props.onConfirm}
		/>,
	]}

  modal={false}
  open={props.isOpen}
  onRequestClose={props.onCancel}
>
  You are sure want publish story ?
</Dialog>;

export default PublishConfirmDialog;
