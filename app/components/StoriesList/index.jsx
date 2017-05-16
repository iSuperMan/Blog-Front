// @flow
import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { formatDate } from '../../services/helpers';
import type { Story } from '../../services/entities/story';

type StoriesListTypes = {
	stories: Array<Story>,
	isFetching: true,
	history: {
		push: () => void,
	}
};

const StoriesList = (props: StoriesListTypes) => {
	if (props.isFetching) {
		return null;
	}

	return (
		<div>
			{props.stories.map(story => <Card
				key={story._id}
				style={{ marginBottom: 30 }}
			>
				<CardHeader
					title={`${_.get(story, '_author.fullName')}`}
					subtitle={formatDate(story.firstPublishedDate)}
					avatar={`${_.get(story, '_author.avatar.path')}`}
				/>

				{story.publishContent.cover && <CardMedia
					overlay={story.publishContent.name
						? <CardTitle title={story.publishContent.name} />
						: null
					}
				>
					<img alt="" src={`${_.get(story, 'publishContent.cover.path')}`} />
				</CardMedia>}

				{!story.publishContent.cover && story.publishContent.name
					? <CardTitle title={story.publishContent.name} />
					: null
				}

				{story.publishContent.text && <CardText>{story.publishContent.name}</CardText>}

				<CardActions>
					<FlatButton label="Перейти" onTouchTap={() => props.history.push(`/@${story._author.username}/${story._id}`)} />
				</CardActions>
			</Card>)}
		</div>
	);
};

export default withRouter(StoriesList);
