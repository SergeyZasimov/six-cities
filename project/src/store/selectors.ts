import { State } from '../types/state';
import { AuthorizationStatus, DomainNameSpace } from '../const';
import { Offer } from '../types/offer';

export const getAuthorizationStatus = ( state: State ) =>
  state[DomainNameSpace.User].authorizationStatus;

export const getLocation = ( state: State ) =>
  state[DomainNameSpace.Location].currentLocation;

export const getOffers = ( state: State ) =>
  state[DomainNameSpace.Data].offers;

export const getCommentList = ( state: State ) =>
  state[DomainNameSpace.Data].commentList;

export const getRoom = ( state: State ) =>
  state[DomainNameSpace.Data].room;

export const getNearbyOffers = ( state: State ) =>
  state[DomainNameSpace.Data].nearbyOffers;

export const getUserName = ( state: State ) =>
  state[DomainNameSpace.User].userName;

export const getIsDataLoading = ( state: State ) =>
  state[DomainNameSpace.Data].isDataLoading;

export const getIsDataSending = ( state: State ) =>
  state[DomainNameSpace.Data].isDataSending;
