import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State) =>
  state.User.authorizationStatus;

export const getUserName = (state: State) =>
  state.User.userName;

