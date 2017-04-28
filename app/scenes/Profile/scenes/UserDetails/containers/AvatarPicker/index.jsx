// @flow
import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import CameraIcon from 'material-ui/svg-icons/image/photo-camera';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';
import { compose, withHandlers, withProps, defaultProps } from 'recompose';
import { images } from '../../../../../../services/api';
import * as actions from './actions';
import reducers from './reducers';
import * as selectors from './selectors';
import { imageSchema } from '../../../../../../services/entities/image';
import type { Image } from '../../../../../../services/entities/image';
import { getEntities } from '../../../../../../selectors';


type AvatarPickerType = {
	inputChangeHandler: () => void,
	loader: boolean,
	image: Image | null,
	size?: number,
}

const AvatarPicker = (props: AvatarPickerType) => <div>
  <input
    type="file"
    id="avatar-upload-input"
    onChange={props.inputChangeHandler}
    style={{ display: 'none' }}
  />

  <div style={{ position: 'relative', width: props.size }}>
    <Avatar
      size={props.size}
			src={props.image && props.image.path}
      style={{ position: 'absolute' }}
    />

		<Avatar
			icon={<CameraIcon />}
			size={props.size}
			color="rgba(250, 250, 250, 0.8)"
			style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', position: 'absolute', cursor: 'pointer' }}
			onClick={() => $('#avatar-upload-input').click()}
		/>

    {props.loader && <CircularProgress size={props.size} thickness={5} style={{ position: 'absolute' }} />}
  </div>
</div>;

export { reducers, actions, selectors };

export default compose(
	defaultProps({
		size: 150,
	}),

	connect(
		state => ({
			loader: selectors.getLoader(state),
			entities: getEntities(state),
		}),

		{
			uploadImage: images.actions.uploadImage,
			showLoader: actions.showLoader,
			hideLoader: actions.hideLoader,
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
)(AvatarPicker);
