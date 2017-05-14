// @flow
import React from 'react';
import _ from 'lodash';
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
      title={_.get(commentary, 'author.fullName')}
      subtitle={formatDate(commentary.createdAt)}
      avatar={_.get(commentary, 'author.avatar.path')}
    />

    <CardText>{commentary.body}</CardText>
  </Card>)}
</div>;

export default CommentariesList;
