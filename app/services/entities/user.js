import { schema } from 'normalizr';
import { imageSchema } from './image';
import type { Image } from './image';

export const userSchema = new schema.Entity('users', {
	avatar: imageSchema,
}, { idAttribute: '_id' });

export const arrayOfUserSchemas = new schema.Array(userSchema);

export type User = {
  avatar: Image,
  bio: string,
  email: string,
  username: string,
  fullName: string,
  _id: string,
};
