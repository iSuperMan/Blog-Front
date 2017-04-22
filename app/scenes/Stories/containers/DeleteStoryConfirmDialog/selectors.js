import { createSelector } from 'reselect';
import { getDeleteStoryConfirmDialog } from '../../selectors';

export const getIsOpen = createSelector(getDeleteStoryConfirmDialog, dialog => dialog.isOpen);
export const getStoryId = createSelector(getDeleteStoryConfirmDialog, dialog => dialog.storyId);
