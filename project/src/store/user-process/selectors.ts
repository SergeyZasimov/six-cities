import { DomainNameSpace } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State) =>
  state[DomainNameSpace.User].authorizationStatus;

export const getUserName = (state: State) =>
  state[DomainNameSpace.User].userName;

