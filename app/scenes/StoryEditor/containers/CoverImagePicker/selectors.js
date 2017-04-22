import _ from 'lodash';
import { createSelector } from 'reselect';
import { getCoverImagePicker } from '../../selectors';

export const getLoader = createSelector(
  getCoverImagePicker,
  coverImagePicker => _.get(coverImagePicker, 'loader', false),
);

export default {};
