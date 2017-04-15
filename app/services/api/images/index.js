import keyMirror from 'keymirror';
import { CALL_API, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';
import { imageSchema } from '../../entities/image';
import endpoints from '../endpoints';
import { token } from '../../helpers';

export const types = keyMirror({
	UPLOAD_IMAGE_REQUEST: null,
	UPLOAD_IMAGE_SUCCESS: null,
	UPLOAD_IMAGE_FAILURE: null,
});

export const actions = {
	uploadImage: (file) => {
		const formData = new FormData();
		formData.append('data', JSON.stringify({}));
		formData.append('image', file);

		return {
			[CALL_API]: {
				endpoint: endpoints.IMAGES_API,
				method: 'POST',
				body: formData,

				headers: {
					Authorization: `Bearer ${token.get()}`,
					Accept: 'application/json',
				},

				types: [
					types.UPLOAD_IMAGE_REQUEST,

					{
						type: types.UPLOAD_IMAGE_SUCCESS,

						payload: (action, state, res) => getJSON(res).then(
							/* eslint-disable arrow-body-style */
							({ response }) => {
								return response.image
									? normalize(response.image, imageSchema)
									: Promise.reject();
							},
							/* eslint-enable arrow-body-style */
						),
					},

					types.UPLOAD_IMAGE_FAILURE,
				],
			},
		};
	},
};
