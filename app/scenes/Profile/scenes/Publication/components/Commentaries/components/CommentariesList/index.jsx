// @flow
import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import type { Commentary } from '../../../../../../../../services/entities/commentary';
import { formatDate } from '../../../../../../../../services/helpers';

type CommentariesListTypes = {
  commentaries: Array<Commentary>,
};

const CommentariesList = (props: CommentariesListTypes) => <div>
	{props.commentaries.reverse().map(commentary => <Card
		style={{ marginTop: 15 }}
		key={commentary._id}
	>
    <CardHeader
      title={<Link
        to={`/@${_.get(commentary, 'author.username')}`}
        style={{ color: '#212121', textDecoration: 'none' }}
      >{_.get(commentary, 'author.fullName')}</Link>}

      subtitle={formatDate(commentary.createdAt)}

      avatar={
        <Link to={`/@${_.get(commentary, 'author.username')}`}>
          <Avatar src={_.get(commentary, 'author.avatar.path')} />
        </Link>
      }
    />

    <CardText>{commentary.body}</CardText>
  </Card>)}
</div>;

export default CommentariesList;
