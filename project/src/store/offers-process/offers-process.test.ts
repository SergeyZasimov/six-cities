import { offersProcess, resetFavoritesOffers, toggleFavoriteOffers } from './offers-process';
import { ApiRoute, LoadingStatus } from '../../const';
import { OffersProcess, State } from '../../types/state';
import { createMockOffer, createMockOffers } from '../../faker-mocks/create-mock-offer';
import { fetchOffersAction } from './async-actions';
import { createApi } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { fetchRoomAction } from '../room-process/async-actions';

describe('OffersProcess: Reducer', () => {
  it('should return initial state', () => {
    expect(offersProcess.reducer(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual({ offers: [], status: LoadingStatus.Idle });
  });

  it('should toggle isFavorite field', () => {
    const mockOffer = createMockOffer({ isFavorite: false });
    const mockOffers = createMockOffers(2, { isFavorite: false });
    const state: OffersProcess = {
      offers: [...mockOffers, mockOffer],
      status: LoadingStatus.Idle
    };

    expect(offersProcess.reducer(state, toggleFavoriteOffers({ ...mockOffer, isFavorite: true })))
      .toEqual({
        offers: [...mockOffers, { ...mockOffer, isFavorite: true }],
        status: LoadingStatus.Idle
      });
  });

  it('shouldn\'t toggle isFavorite field', () => {
    const mockOffer = createMockOffer({ isFavorite: false });
    const mockOffers = createMockOffers(2, { isFavorite: false });
    const state: OffersProcess = {
      offers: mockOffers,
      status: LoadingStatus.Idle
    };

    expect(offersProcess.reducer(state, toggleFavoriteOffers({ ...mockOffer, isFavorite: true })))
      .toEqual({
        offers: mockOffers,
        status: LoadingStatus.Idle
      });
  });

  it('should toggle isFavorite field at all offers', () => {
    const mockOffers = createMockOffers(3, { isFavorite: true });
    const expectedOffers = mockOffers.map(( offer ) => ({ ...offer, isFavorite: false }));

    const state: OffersProcess = {
      offers: mockOffers,
      status: LoadingStatus.Idle
    };

    expect(offersProcess.reducer(state, resetFavoritesOffers()))
      .toEqual({
        offers: expectedOffers,
        status: LoadingStatus.Idle
      });
  });

  it('should update state when GET request', () => {
    const mockOffers = createMockOffers(3);

    const state: OffersProcess = {
      offers: [],
      status: LoadingStatus.Idle
    };

    expect(offersProcess.reducer(state, { type: fetchOffersAction.fulfilled.type, payload: mockOffers }))
      .toEqual({
        offers: mockOffers,
        status: LoadingStatus.Success
      });
  });

  it('should switch status to Loading when running request', () => {
    const state: OffersProcess = {
      offers: [],
      status: LoadingStatus.Idle
    };

    expect(offersProcess.reducer(state, { type: fetchOffersAction.pending.type }))
      .toEqual({
        offers: [],
        status: LoadingStatus.Loading
      });
  });

  it('should switch status to Failed when request rejected', () => {
    const state: OffersProcess = {
      offers: [],
      status: LoadingStatus.Loading
    };

    expect(offersProcess.reducer(state, { type: fetchOffersAction.rejected.type }))
      .toEqual({
        offers: [],
        status: LoadingStatus.Failed
      });
  });
});

describe('OffersProcess: Async Actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('should dispatch LoadOffers', async () => {
    mockApi
      .onGet(ApiRoute.Offers)
      .reply(200);
    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(( { type } ) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type,
    ]);
  });
});
