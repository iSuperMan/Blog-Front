import _ from 'lodash';
import { createSelector } from 'reselect';
import { getUI } from '../../selectors';

const getHeader = createSelector(getUI, ui => _.get(ui, 'header', {}));
export const getHeaderShadow = createSelector(getHeader, header => _.get(header, 'shadow', true));
export default {};
