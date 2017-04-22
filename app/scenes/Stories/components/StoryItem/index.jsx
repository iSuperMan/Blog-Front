// @flow
import React from 'react';
import { ListItem } from 'material-ui/List';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import type { Story } from '../../../../services/entities/story';
import { formatDate } from '../../../../services/helpers';

const iconButtonElement = (
  <IconButton touch>
    <MoreVertIcon color={grey400} />
  </IconButton>
);

type PublicationItemProps = {
  story: Story,
  editClickHandler: () => void,
  deleteClickHandler: () => void,
};

const PublicationItem = ({
  story, editClickHandler, deleteClickHandler,
}: PublicationItemProps) => <ListItem
  onTouchTap={editClickHandler}
  primaryText={story.draftContent.name || 'Untitled story'}
  secondaryTextLines={2}
  secondaryText={`Last edited ${formatDate(story.lastEditedDate)}${story.hasUnpublishedChanges ? ' · Unpublished changes' : ''}`}

  rightIconButton={
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem onTouchTap={editClickHandler}>
        Edit {story.isPublished ? 'story' : 'draft'}
      </MenuItem>

      <MenuItem onTouchTap={deleteClickHandler}>
        Delete {story.isPublished ? 'story' : 'draft'}
      </MenuItem>
    </IconMenu>
  }
/>;

export default PublicationItem;
