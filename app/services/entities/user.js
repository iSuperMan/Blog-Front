import { schema } from 'normalizr';

export const userSchema = new schema.Entity('users', {}, { idAttribute: '_id' });
export const arrayOfUserSchemas = new schema.Array(userSchema);

export type User = {
  email: string,
  username: string,
  fullName: string,
  _id: string,
};
