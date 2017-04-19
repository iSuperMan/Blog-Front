import { schema } from 'normalizr';

export const storySchema = new schema.Entity('stories', {}, { idAttribute: '_id' });
export const arrayOfStorySchemas = new schema.Array(storySchema);

export type Story = {
  text: string,
  name: string,
  _id: string,
};
