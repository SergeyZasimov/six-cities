import { resetFavoritesRoom, resetLoadingStatus, roomProcess, toggleFavoriteRoom } from './room-process';
import { RoomProcess, State } from '../../types/state';
import { createMockOffer } from '../../faker-mocks/create-mock-offer';
import { ApiRoute, LoadingStatus } from '../../const';
import { fetchRoomAction } from './async-actions';
import { Offer } from '../../types/offer';
import { createApi } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

const offer = createMockOffer();

describe('RoomProcess: Reducer', () => {
  it('should return initial state', () => {
    expect(roomProcess.reducer(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual({ room: {}, status: 'IDLE' });
  });

  it('should toggle isFavorite field', () => {
    const state: RoomProcess = {
      room: offer,
      status: LoadingStatus.Idle
    };
    expect(roomProcess.reducer(state, toggleFavoriteRoom(offer)))
      .toEqual({ room: { ...offer, isFavorite: !offer.isFavorite }, status: LoadingStatus.Idle });
  });

  it('shouldn\'t toggle isFavorite field', () => {
    const anotherOffer = createMockOffer();
    const state: RoomProcess = {
      room: offer,
      status: LoadingStatus.Idle
    };
    expect(roomProcess.reducer(state, toggleFavoriteRoom(anotherOffer)))
      .toEqual({ room: { ...offer, isFavorite: offer.isFavorite }, status: LoadingStatus.Idle });
  });

  it('should reset loading status', () => {
    const state: RoomProcess = {
      room: offer,
      status: LoadingStatus.Failed
    };
    expect(roomProcess.reducer(state, resetLoadingStatus()))
      .toEqual({ room: offer, status: LoadingStatus.Idle });
  });

  it('should toggle isFavorite field to false', () => {
    const favoriteOffer = { ...offer, isFavorite: true };
    const state: RoomProcess = {
      room: favoriteOffer,
      status: LoadingStatus.Success
    };
    expect(roomProcess.reducer(state, resetFavoritesRoom()))
      .toEqual({ room: { ...offer, isFavorite: false }, status: LoadingStatus.Success });
  });

  it('should update room by load server data', () => {
    const state: RoomProcess = {
      room: {} as Offer,
      status: LoadingStatus.Idle
    };
    expect(roomProcess.reducer(state, { type: fetchRoomAction.fulfilled.type, payload: offer }))
      .toEqual({
        room: offer,
        status: LoadingStatus.Success
      });
  });

  it('should toggle loading status to Fail', () => {
    const state: RoomProcess = {
      room: {} as Offer,
      status: LoadingStatus.Idle
    };
    expect(roomProcess.reducer(state, { type: fetchRoomAction.rejected.type }))
      .toEqual({
        room: {},
        status: LoadingStatus.Failed
      });
  });

  it('should toggle loading status to Loading', () => {
    const state: RoomProcess = {
      room: {} as Offer,
      status: LoadingStatus.Idle
    };
    expect(roomProcess.reducer(state, { type: fetchRoomAction.pending.type }))
      .toEqual({
        room: {},
        status: LoadingStatus.Loading
      });
  });
});

describe('RoomProcess: Async Actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('should dispatch LoadRoom when GET request', async () => {
    mockApi
      .onGet(`${ApiRoute.Offers}/${offer.id}`)
      .reply(200, offer);
    const store = mockStore();

    await store.dispatch(fetchRoomAction(offer.id.toString()));

    const actions = store.getActions().map(( { type } ) => type);

    expect(actions).toEqual([
      fetchRoomAction.pending.type,
      fetchRoomAction.fulfilled.type,
    ]);
  });
});
