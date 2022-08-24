import { commentsProcess } from './comments-process';
import { ApiRoute, SendingStatus } from '../../const';
import { CommentsProcess, State } from '../../types/state';
import {
  createMockComment,
  createMockCommentsList,
  createMockNewComment
} from '../../faker-mocks/create-mock-comments';
import { fetchComments, sendNewComment } from './async-actions';
import { createApi } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

const mockCommentsList = createMockCommentsList(2);

describe('CommentProcess: Reducer', () => {
  it('should return initial state', () => {
    expect(commentsProcess.reducer(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual({ commentsList: [], status: SendingStatus.Idle });
  });

  it('should update comments list when GET request', () => {
    const state: CommentsProcess = {
      commentsList: [],
      status: SendingStatus.Idle
    };

    expect(commentsProcess.reducer(state, { type: fetchComments.fulfilled.type, payload: mockCommentsList }))
      .toEqual({
        commentsList: mockCommentsList,
        status: SendingStatus.Idle
      });
  });

  it('should update comments list when POST request', () => {
    const newComment = createMockComment();

    const state: CommentsProcess = {
      commentsList: mockCommentsList,
      status: SendingStatus.Idle
    };

    expect(commentsProcess.reducer(
      state, { type: sendNewComment.fulfilled.type, payload: [...mockCommentsList, newComment] }))
      .toEqual({
        commentsList: [...mockCommentsList, newComment],
        status: SendingStatus.Success
      });
  });

  it('should toggle status to Sending when send new comment', () => {
    const state: CommentsProcess = {
      commentsList: [],
      status: SendingStatus.Idle
    };

    expect(commentsProcess.reducer(state, { type: sendNewComment.pending.type }))
      .toEqual({
        commentsList: [],
        status: SendingStatus.Sending
      });
  });

  it('should toggle status to Failed when sending new comment was rejected', () => {
    const state: CommentsProcess = {
      commentsList: [],
      status: SendingStatus.Idle
    };

    expect(commentsProcess.reducer(state, { type: sendNewComment.rejected.type }))
      .toEqual({
        commentsList: [],
        status: SendingStatus.Failed
      });
  });
});

describe('CommentsProcess: Async Actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
  const newComment = createMockNewComment();

  it('should dispatch SendNewComment when POST request', async () => {
    mockApi
      .onPost(`${ApiRoute.Comments}/${newComment.roomId}`)
      .reply(200);

    const store = mockStore();

    await store.dispatch(sendNewComment(newComment));

    const actions = store.getActions().map(( { type } ) => type);

    expect(actions).toEqual([
      sendNewComment.pending.type,
      sendNewComment.fulfilled.type
    ]);
  });

  it('should dispatch LoadComments when GET request', async () => {
    const id = '1';

    mockApi
      .onGet(`${ApiRoute.Comments}/${id}`)
      .reply(200);

    const store = mockStore();

    await store.dispatch(fetchComments(id));

    const actions = store.getActions().map(( { type } ) => type);

    expect(actions).toEqual([
      fetchComments.pending.type,
      fetchComments.fulfilled.type
    ]);
  });
});
