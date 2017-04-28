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
	itemClickHandleCreator: () => any,
}

const StoriesList = (props: StoriesListProps) => {
	if (!props.stories.length && props.isFetching) {
		return null;
	}

	return (<List>
		{props.stories.map(story => <StoryItem
			deleteClickHandler={props.deleteClickHandleCreator(story)}
			editClickHandler={props.editClickHandleCreator(story)}
			itemClickHandler={props.itemClickHandleCreator(story)}
			key={story._id}
			story={story}
		/>)}
	</List>);
};

export default StoriesList;
