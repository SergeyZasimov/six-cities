import { nearbyOffersProcess, resetFavoritesNearbyOffers, toggleFavoriteNearbyOffers } from './nearby-offers-process';
import { NearbyOffersProcess, State } from '../../types/state';
import { createMockOffer, createMockOffers } from '../../faker-mocks/create-mock-offer';
import { fetchNearbyOffers } from './async-actions';
import { createApi } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { ApiRoute } from '../../const';

describe('NearbyOffersProcess: Reducer', () => {
  it('should return initial state', () => {
    expect(nearbyOffersProcess.reducer(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual({ nearbyOffers: [] });
  });

  it('should toggle isFavorite field', () => {
    const mockOffer = createMockOffer({ isFavorite: false });
    const mockNearbyOffers = createMockOffers(2, { isFavorite: false });
    const state: NearbyOffersProcess = {
      nearbyOffers: [...mockNearbyOffers, mockOffer]
    };

    expect(nearbyOffersProcess.reducer(
      state,
      toggleFavoriteNearbyOffers({ ...mockOffer, isFavorite: true })))
      .toEqual({
        nearbyOffers: [...mockNearbyOffers, { ...mockOffer, isFavorite: true }]
      });
  });

  it('shouldn\'t toggle isFavorite field', () => {
    const mockOffer = createMockOffer({ isFavorite: true });
    const mockNearbyOffers = createMockOffers(3, { isFavorite: false });
    const state: NearbyOffersProcess = {
      nearbyOffers: mockNearbyOffers
    };

    expect(nearbyOffersProcess.reducer(
      state,
      toggleFavoriteNearbyOffers(mockOffer)))
      .toEqual({
        nearbyOffers: mockNearbyOffers
      });
  });

  it('should reset isFavorite field at all nearby offers', () => {
    const mockNearbyOffers = createMockOffers(3, { isFavorite: true });
    const expectedNearbyOffers = mockNearbyOffers.map(( offer ) => ({ ...offer, isFavorite: false }));

    const state: NearbyOffersProcess = {
      nearbyOffers: mockNearbyOffers
    };

    expect(nearbyOffersProcess.reducer(state, resetFavoritesNearbyOffers()))
      .toEqual({ nearbyOffers: expectedNearbyOffers });
  });

  it('should update state when GET request', () => {
    const mockNearbyOffers = createMockOffers(3, { isFavorite: true });

    const state: NearbyOffersProcess = {
      nearbyOffers: [],
    };

    expect(nearbyOffersProcess.reducer(
      state,
      { type: fetchNearbyOffers.fulfilled.type, payload: mockNearbyOffers }))
      .toEqual({
        nearbyOffers: mockNearbyOffers
      });
  });
});

describe('NearbyOffersProcess: Async Actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('should dispatch LoadNearbyOffers', async () => {
    const id = '1';
    mockApi
      .onGet(`${ApiRoute.Offers}/${id}/nearby`)
      .reply(200);
    const store = mockStore();

    await store.dispatch(fetchNearbyOffers(id));

    const actions = store.getActions().map(( { type } ) => type);

    expect(actions).toEqual([
      fetchNearbyOffers.pending.type,
      fetchNearbyOffers.fulfilled.type,
    ]);
  });

});
