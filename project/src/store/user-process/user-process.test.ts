import { State, UserProcess } from '../../types/state';
import { userProcess } from './user-process';
import { ApiRoute, AuthorizationStatus, AUTH_TOKEN_KEY_NAME } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from './async-actions';
import { createApi } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { AuthData } from '../../types/auth-data';
import { redirectToRoute } from '../actions';
import { resetFavoritesOffers } from '../offers-process/offers-process';
import { resetFavorites } from '../favotires-process/favorites-process';
import { resetFavoritesRoom } from '../room-process/room-process';
import { resetFavoritesNearbyOffers } from '../nearby-offers-process/nearby-offers-process';

describe('UserProcess: Reducer', () => {
  it('should return initial state', () => {
    expect(userProcess.reducer(undefined, { type: 'UNKNOWN_TYPE' }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        userName: ''
      });
  });

  it('should switch authorizationStatus when checkAuthAction running', () => {
    const state: UserProcess = {
      authorizationStatus: AuthorizationStatus.Auth,
      userName: ''
    };

    expect(userProcess.reducer(state, { type: checkAuthAction.pending.type }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        userName: ''
      });
  });

  it('should update state when checkAuthAction fulfilled', () => {
    const state: UserProcess = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userName: ''
    };

    expect(userProcess.reducer(state, { type: checkAuthAction.fulfilled.type, payload: 'Jack' }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userName: 'Jack'
      });
  });

  it('should switch authorizationStatus to NoAuth when checkAuthAction rejected', () => {
    const state: UserProcess = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userName: ''
    };

    expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userName: ''
      });
  });

  it('should update state when loginAction fulfilled', () => {
    const state: UserProcess = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userName: ''
    };

    expect(userProcess.reducer(state, { type: loginAction.fulfilled.type, payload: 'Jack' }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userName: 'Jack'
      });
  });

  it('should switch authorizationStatus to NoAuth when loginAction rejected', () => {
    const state: UserProcess = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userName: ''
    };

    expect(userProcess.reducer(state, { type: loginAction.rejected.type }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userName: ''
      });
  });

  it('should reset state when logoutAction', () => {
    const state: UserProcess = {
      authorizationStatus: AuthorizationStatus.Auth,
      userName: 'Jack'
    };

    expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userName: ''
      });
  });
});

describe('UserProcess: Async Actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('should dispatch checkAuthAction when GET request', async () => {
    mockApi
      .onGet(ApiRoute.Login)
      .reply(200, 'Jack');
    const store = mockStore();

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(( { type } ) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it('should dispatch loginAction when POST request', async () => {
    const mockUser: AuthData = {
      login: 'test@test.com',
      password: 'qwerty'
    };

    mockApi
      .onPost(ApiRoute.Login)
      .reply(200, { token: 'secret' });

    const store = mockStore();

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(mockUser));

    const actions = store.getActions().map(( { type } ) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, 'secret');
  });

  it('should dispatch logoutAction when DELETE request', async () => {
    mockApi
      .onDelete(ApiRoute.Logout)
      .reply(204);

    const store = mockStore();

    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());


    const actions = store.getActions().map(( { type } ) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      resetFavoritesOffers.type,
      resetFavorites.type,
      resetFavoritesRoom.type,
      resetFavoritesNearbyOffers.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });
});
