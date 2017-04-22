import { schema } from 'normalizr';
import { imageSchema } from './image';
import type { Image } from './image';

export const storySchema = new schema.Entity('stories', {
	draftContent: {
		cover: imageSchema,
	},

	publishContent: {
		cover: imageSchema,
	},
}, { idAttribute: '_id' });
export const arrayOfStorySchemas = new schema.Array(storySchema);

export type Story = {
  draftContent: {
    text: string,
    name: string,
    cover: Image,
  },

  publishContent?: {
    text: string,
    name: string,
    cover: Image,
  },

  lastEditedDate: string,
  firstPublishedDate?: string,
  lastPublishedDate?: string,
  isPublished: boolean,
  hasUnpublishedChanges?: boolean,
  _id: string,
};
