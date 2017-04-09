import { createSelector } from 'reselect';
import _ from 'lodash';
import { getEntryDialog } from '../../selectors';

export const getIsOpen = createSelector(
  getEntryDialog,
  entryDialog => _.get(entryDialog, 'isOpen', false),
);

export const getIsSignUpForm = createSelector(
    getEntryDialog,
    entryDialog => _.get(entryDialog, 'isSignUpForm', true),
);
