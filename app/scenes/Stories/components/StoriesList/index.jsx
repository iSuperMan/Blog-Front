// @flow
import React from 'react';
import { List } from 'material-ui/List';
import StoryItem from '../StoryItem';
import type { Story } from '../../../../services/entities/story';

type StoriesListProps = {
	stories: Array<Story>,
	isFetching: boolean,
	deleteClickHandleCreator: () => any,
	editClickHandleCreator: () => any,
}

const StoriesList = (props: StoriesListProps) => {
	if (!props.stories.length && props.isFetching) {
		return null;
	}

	return (<List>
		{props.stories.map(story => <StoryItem
			deleteClickHandler={props.deleteClickHandleCreator(story._id)}
			editClickHandler={props.editClickHandleCreator(story._id)}
			key={story._id}
			story={story}
		/>)}
	</List>);
};

export default StoriesList;
