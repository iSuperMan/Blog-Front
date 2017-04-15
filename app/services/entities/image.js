import { schema } from 'normalizr';

export const imageSchema = new schema.Entity('images', {}, { idAttribute: '_id' });
export const arrayOfImageSchemas = new schema.Array(imageSchema);

export type Image = {
  path: string,
  _id: string,
};
