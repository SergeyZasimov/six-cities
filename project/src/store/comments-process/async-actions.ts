import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute, StateAction } from '../../const';
import { Comment, CommentData } from '../../types/comment';
import { ThunkApiConfigType } from '../../types/state';

export const fetchComments = createAsyncThunk<
  Comment[],
  string,
  ThunkApiConfigType
>(StateAction.Comments.LoadComments, async (id, { extra: api }) => {
  const { data } = await api.get<Comment[]>(`${ApiRoute.Comments}/${id}`);
  return data as Comment[];
});

export const sendNewComment = createAsyncThunk<
  Comment[],
  CommentData,
  ThunkApiConfigType
>(
  StateAction.Comments.SendNewComment,
  async ({ roomId, rating, comment }, { extra: api }) => {
    const { data } = await api.post(`${ApiRoute.Comments}/${roomId}`, {
      rating,
      comment,
    });
    return data;
  },
);
