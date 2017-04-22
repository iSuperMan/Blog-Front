// @flow
import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { compose, withHandlers, withProps } from 'recompose';
import PanoramaIcon from 'material-ui/svg-icons/image/panorama';
import { images } from '../../../../services/api';
import * as actions from './actions';
import reducers from './reducers';
import * as selectors from './selectors';
import { imageSchema } from '../../../../services/entities/image';
import type { Image } from '../../../../services/entities/image';
import { getEntities } from '../../../../selectors';


type CoverImagePickerType = {
	inputChangeHandler: () => void,
	loader: boolean,
	image: Image | null,
}

const CoverImagePicker = (props: CoverImagePickerType) => <div>
  <input
    type="file"
    id="cover-image-input"
    onChange={props.inputChangeHandler}
    style={{ display: 'none' }}
  />

  <div onTouchTap={() => !props.loader && $('#cover-image-input').click()} style={{ width: '100%', position: 'relative', cursor: 'pointer' }}>
		{props.image
			? <div>
				<img alt="" src={props.image.path} style={{ width: '100%' }} />
			</div>

			: <div style={{ width: '100%', height: 150, backgroundColor: '#E0E0E0', paddingTop: 40 }}>
				<div style={{ width: 70, margin: 'auto' }}>
					<PanoramaIcon style={{ width: 70, height: 70 }} color="#757575" />
				</div>
			</div>
		}
  </div>
</div>;

export { reducers, actions, selectors };

export default compose(
	connect(
		state => ({
			loader: selectors.getLoader(state),
			entities: getEntities(state),
		}),

		{
			uploadImage: images.actions.uploadImage,
			showLoader: actions.showCoverImageLoader,
			hideLoader: actions.hideCoverImageLoader,
		},
	),

	withProps(({ input, entities }) => ({
		image: input.value ? denormalize(input.value, imageSchema, entities) : null,
	})),

	withHandlers({
		inputChangeHandler: props => (e) => {
			if (!e.target.files.length) {
				return;
			}

			props.showLoader();

			props.uploadImage(e.target.files[0])
				.then((action) => {
					if (props.input && _.isFunction(props.input.onChange)) {
						props.input.onChange(_.get(action, 'payload.result'));
					}

					props.hideLoader();
				});
		},
	}),
)(CoverImagePicker);
