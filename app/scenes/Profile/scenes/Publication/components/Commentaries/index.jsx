// @flow
import React from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import CommentaryForm from './components/CommentaryForm';
import CommentariesList from './components/CommentariesList';
import { stories } from '../../../../../../services/api';
import type { Story } from '../../../../../../services/entities/story';

type CommentariesTypes = {
	postStoryCommentary: () => Promise<any>,
	resetForm: () => void,
	publication: Story,
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
					<CommentaryForm
						onSubmit={({ body }) =>
							props.postStoryCommentary({ body, storyId: props.publication._id })
								.then(() => {
									props.resetForm('commetaryForm');
								})
						}
					/>
        </div>

				<div style={{ marginTop: 30 }}>
					<CommentariesList commentaries={props.publication.commentaries} />
				</div>
      </div>
    </div>
  </div>
</div>;

export default connect(
  null,
	{ postStoryCommentary: stories.actions.postStoryCommentary, resetForm: reset },
)(Commentaries);
