import { schema } from 'normalizr';

export const storySchema = new schema.Entity('stories', {}, { idAttribute: '_id' });
export const arrayOfStorySchemas = new schema.Array(storySchema);

export type Story = {
  draftContent: {
    text: string,
    name: string,
  },

  publishContent?: {
    text: string,
    name: string,
  },

  lastEditedDate: string,
  firstPublishedDate?: string,
  lastPublishedDate?: string,
  isPublished: boolean,
  hasUnpublishedChanges?: boolean,
  _id: string,
};
