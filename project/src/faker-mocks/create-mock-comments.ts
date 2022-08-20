import { Comment, CommentData } from '../types/comment';
import { datatype, lorem } from 'faker';
import { createMockHost } from './create-mock-host';

export const createMockComment = (): Comment => ({
  id: datatype.number(),
  name: lorem.words(1),
  rating: datatype.number({ min: 1, max: 5 }),
  date: datatype.datetime().toString(),
  comment: lorem.words(50),
  user: createMockHost(),
});

export const createMockCommentsList = ( count: number ): Comment[] => {
  return Array.from({ length: count }, createMockComment);
};

export const createMockNewComment = (): CommentData => ({
  roomId: datatype.number(),
  rating: datatype.number({ min: 1, max: 5 }),
  comment: lorem.words(50),
})
