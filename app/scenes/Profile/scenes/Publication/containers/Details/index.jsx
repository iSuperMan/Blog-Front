// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import FloalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router';
import type { Story } from '../../../../../../services/entities/story';
import UserPreview from '../../../../../../components/UserPreview';
import LikeButton from '../../../../../../components/LikeButton';
import { formatDate } from '../../../../../../services/helpers';
import { stories } from '../../../../../../services/api';
import { selectors as authSelectors } from '../../../../../../services/auth';
import { actions as entryDialogActions } from '../../../../../../containers/EntryDialog';

type DetailsProps = {
	likesCount: number,
  isLiked: boolean,
  publication: Story,
  isCanEdit: boolean,
	onLikeButtonClick: () => void,
  history: {
    push: () => void,
  }
};

const Details = ({
  history, isCanEdit, isLiked, onLikeButtonClick, likesCount,
  publication: { publishContent, _author, _id, isPublished, lastEditedDate },
}: DetailsProps) => <div
  className="container"
  style={{ marginTop: 50 }}
>
  <div className="row">
    <div className="col-sm-10 offset-sm-1">

      <div
        className="row"
        style={{ marginBottom: 45 }}
      >
        <div className="col-sm-10">
          <UserPreview
            user={_author}
            bottomText={isPublished
              ? formatDate(lastEditedDate)
              : 'Draft'
            }
          />
        </div>

        {isCanEdit && <div
          className="col-sm-2"
          style={{ textAlign: 'right' }}
        >
          <RaisedButton
            label="Edit"
            primary
            onClick={() => history.push(`/p/${_id}`)}
          />
        </div>}
      </div>

      {publishContent.name && <div
        className="row"
        style={{ marginBottom: 20 }}
      >
        <div className="col-sm-12">
          <h1>{publishContent.name}</h1>
        </div>
      </div>}

      {publishContent.cover && <div
        className="row"
        style={{ marginBottom: 20 }}
      >
        <div className="col-sm-12">
          <img
            alt=""
            src={publishContent.cover.path}
            style={{ width: '100%' }}
          />
        </div>
      </div>}

      {publishContent.text && <div className="row">
        <div className="col-sm-12">
          <FloalaEditorView model={publishContent.text} />
        </div>
      </div>}
    </div>
  </div>

	<div className="row">
		<div className="col-sm-10 offset-sm-1" style={{ marginTop: 15 }}>
			<LikeButton
				isLiked={isLiked}
				onClick={onLikeButtonClick}
				value={likesCount}
			/>
		</div>
	</div>
</div>;


export default compose(
	connect(
		state => ({ me: authSelectors.getUser(state) }),

		{
			likeStory: stories.actions.likeStory,
			unlikeStory: stories.actions.unlikeStory,
			openEntryDialog: entryDialogActions.openEntryDialog,
		},
	),

  withRouter,

	withProps(
		(props) => {
			const isLiked = !!props.me && _.get(props.publication, 'likes', []).indexOf(props.me._id) !== -1;
			let onClick = () => { props.openEntryDialog(); };

			if (props.me) {
				onClick = () => { (isLiked ? props.unlikeStory : props.likeStory)(props.publication._id); };
			}

			return {
				isLiked,
				onLikeButtonClick: onClick,
				likesCount: _.get(props.publication, 'likes', []).length,
			};
		},
	),
)(Details);
