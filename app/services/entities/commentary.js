import { schema } from 'normalizr';
import { userSchema } from './user';
import type { User } from './user';

export const commentarySchema = new schema.Entity('commentaries', {
	author: userSchema,
}, { idAttribute: '_id' });

export const arrayOfCommentarySchemas = new schema.Array(commentarySchema);

export type Image = {
  author: User,
  createdAt: string,
  body: string,
  _id: string,
};
