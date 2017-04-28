// @flow
import React from 'react';
import FloalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router';
import type { Story } from '../../../../../../services/entities/story';
import UserPreview from '../../../../../../components/UserPreview';
import { formatDate } from '../../../../../../services/helpers';

type DetailsProps = {
  publication: Story,
  isCanEdit: boolean,
  history: {
    push: () => void,
  }
};

const Details = ({
  history, isCanEdit,
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
</div>;

export default withRouter(Details);
