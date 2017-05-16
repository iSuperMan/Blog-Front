// @flow
import React from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import CommentaryForm from './components/CommentaryForm';
import CommentariesList from './components/CommentariesList';
import { stories } from '../../../../../../services/api';
import type { Story } from '../../../../../../services/entities/story';
import { selectors as authSelectors } from '../../../../../../services/auth';
import { actions as entryDialogActions } from '../../../../../../containers/EntryDialog';
import type { User } from '../../../../../../services/entities/user';

type CommentariesTypes = {
	postStoryCommentary: () => Promise<any>,
	resetForm: () => void,
	publication: Story,
	me: User | null,
	openEntryDialog: () => void,
}

const Commentaries = (props: CommentariesTypes) => <div
  style={{ paddingBottom: 30, paddingTop: 50, marginTop: 40, backgroundColor: '#FAFAFA' }}
>
  <div className="container">
    <div className="row">
      <div className="col-sm-8 offset-sm-2">
        <div style={{ color: '#616161' }}>
          Commentaries
        </div>

        <div style={{ marginTop: 15 }}>
					{props.me
						? <CommentaryForm
							onSubmit={({ body }) =>
								props.postStoryCommentary({ body, storyId: props.publication._id })
									.then(() => {
										props.resetForm('commetaryForm');
									})
							}
						/>

						: <RaisedButton
							label="Войдите, чтобы оставить комментарий"
							primary
							fullWidth
							style={{ marginTop: 15 }}
							onTouchTap={() => props.openEntryDialog()}
						/>}
        </div>

				<div style={{ marginTop: 30 }}>
					<CommentariesList commentaries={props.publication.commentaries} />
				</div>
      </div>
    </div>
  </div>
</div>;

export default connect(
	state => ({ me: authSelectors.getUser(state) }),

	{
		postStoryCommentary: stories.actions.postStoryCommentary,
		resetForm: reset,
		openEntryDialog: entryDialogActions.openEntryDialog,
	},
)(Commentaries);
