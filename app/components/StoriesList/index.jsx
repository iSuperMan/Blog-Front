// @flow
import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import ChatIcon from 'material-ui/svg-icons/communication/chat-bubble';
import { grey600 } from 'material-ui/styles/colors';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import LikeButton from '../LikeButton';
import { formatDate } from '../../services/helpers';
import type { Story } from '../../services/entities/story';
import type { User } from '../../services/entities/user';

type StoriesListTypes = {
	stories: Array<Story>,
	me: User | null,
	isFetching: true,
	openEntryDialog: () => void,
	likeStory: () => void,
	unlikeStory: () => void,
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
			{props.stories.map((story) => {
				const isLiked = !!props.me && _.get(story, 'likes', []).indexOf(props.me._id) !== -1;
				let onClick = () => { props.openEntryDialog(); };

				if (props.me) {
					onClick = () => { (isLiked ? props.unlikeStory : props.likeStory)(story._id); };
				}

				return (
					<Card
						key={story._id}
						style={{ marginBottom: 30 }}
					>
						<CardHeader
							title={<Link
								to={`/@${_.get(story, '_author.username')}`}
								style={{ color: '#212121', textDecoration: 'none' }}
							>{_.get(story, '_author.fullName')}</Link>}

							subtitle={formatDate(story.firstPublishedDate)}

							avatar={
								<Link to={`/@${_.get(story, '_author.username')}`}>
									<Avatar src={_.get(story, '_author.avatar.path')} />
								</Link>
							}
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
							<div style={{ display: 'inline-block', marginRight: 35 }}>
								<LikeButton isLiked={isLiked} onClick={onClick} value={_.get(story, 'likes', []).length} />
							</div>

							<div style={{ float: 'right', display: 'inline-block' }}>
								<div style={{ display: 'inline-block', position: 'relative', top: 10, marginRight: 15 }}>
									<div>
										<ChatIcon color={grey600} />

										<span style={{ position: 'relative', bottom: 5, color: grey600, marginLeft: 12 }}>
											{_.get(story, 'commentaries', []).length}
										</span>
									</div>
								</div>

								<FlatButton
									style={{ top: 2 }}
									label="Читать"
									onTouchTap={() => props.history.push(`/@${story._author.username}/${story._id}`)}
								/>
							</div>
						</CardActions>
					</Card>
				);
			})}
		</div>
	);
};

export default withRouter(StoriesList);
