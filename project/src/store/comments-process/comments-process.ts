import { createSlice } from '@reduxjs/toolkit';
import { DomainNameSpace, SendingStatus } from '../../const';
import { CommentsProcess } from '../../types/state';
import { fetchComments, sendNewComment } from './async-actions';

const initialState: CommentsProcess = {
  commentsList: [],
  status: SendingStatus.Idle,
};

export const commentsProcess = createSlice({
  name: DomainNameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsList = action.payload;
      })
      .addCase(sendNewComment.pending, (state) => {
        state.status = SendingStatus.Sending;
      })
      .addCase(sendNewComment.fulfilled, (state, action) => {
        state.commentsList = action.payload;
        state.status = SendingStatus.Success;
      })
      .addCase(sendNewComment.rejected, (state) => {
        state.status = SendingStatus.Failed;
      });
  },
});
