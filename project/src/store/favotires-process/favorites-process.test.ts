import { favoritesProcess, resetFavorites } from './favorites-process';
import { FavoritesProcess, State } from '../../types/state';
import { createMockOffer, createMockOffers } from '../../faker-mocks/create-mock-offer';
import { fetchFavoriteOffers, toggleFavorite } from './async-actions';
import { createApi } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { ApiRoute } from '../../const';
import { toggleFavoriteOffers } from '../offers-process/offers-process';
import { toggleFavoriteRoom } from '../room-process/room-process';
import { toggleFavoriteNearbyOffers } from '../nearby-offers-process/nearby-offers-process';

describe('FavoritesProcess: Reducer', () => {
  it('should return initial state', () => {
    expect(favoritesProcess.reducer(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual({ favoriteOffers: [] });
  });

  it('should update state when GET request', () => {
    const mockOffers = createMockOffers(2);
    const state: FavoritesProcess = {
      favoriteOffers: []
    };

    expect(favoritesProcess.reducer(state, { type: fetchFavoriteOffers.fulfilled.type, payload: mockOffers }))
      .toEqual({
        favoriteOffers: [...mockOffers]
      });
  });

  it('should reset favorites', () => {
    const state: FavoritesProcess = {
      favoriteOffers: createMockOffers(3, { isFavorite: true })
    };

    expect(favoritesProcess.reducer(state, resetFavorites()))
      .toEqual({ favoriteOffers: [] });
  });

  it('should remove offer from favorite when offer isFavorite field is false', () => {
    const offer = createMockOffer({ id: 5, isFavorite: false });
    const favoriteOffers = createMockOffers(2, { isFavorite: true });

    const state: FavoritesProcess = {
      favoriteOffers: [...favoriteOffers, offer]
    };

    expect(favoritesProcess.reducer(state, { type: toggleFavorite.fulfilled.type, payload: offer }))
      .toEqual({
        favoriteOffers,
      });
  });

  it('should add offer from favorite when offer isFavorite field is true', () => {
    const offer = createMockOffer({ id: 5, isFavorite: true });
    const favoriteOffers = createMockOffers(2, { isFavorite: true });

    const state: FavoritesProcess = {
      favoriteOffers: [...favoriteOffers]
    };

    expect(favoritesProcess.reducer(state, { type: toggleFavorite.fulfilled.type, payload: offer }))
      .toEqual({
        favoriteOffers: [...favoriteOffers, offer],
      });
  });
});

describe('FavoritesProcess: Async Actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('should dispatch LoadFavorites when GET request', async () => {
    mockApi
      .onGet(ApiRoute.Favorite)
      .reply(200);

    const store = mockStore();

    await store.dispatch(fetchFavoriteOffers());

    const actions = store.getActions().map(( { type } ) => type);

    expect(actions).toEqual([
      fetchFavoriteOffers.pending.type,
      fetchFavoriteOffers.fulfilled.type
    ]);
  });

  it('should dispatch toggleFavorite', async () => {
    const data = { id: 1, status: 1 };

    mockApi
      .onPost(`${ApiRoute.Favorite}/${data.id}/${data.status}`)
      .reply(200);

    const store = mockStore();

    await store.dispatch(toggleFavorite(data));

    const actions = store.getActions().map(( { type } ) => type);

    expect(actions).toEqual([
      toggleFavorite.pending.type,
      toggleFavoriteOffers.type,
      toggleFavoriteRoom.type,
      toggleFavoriteNearbyOffers.type,
      toggleFavorite.fulfilled.type,
    ]);
  });
});
