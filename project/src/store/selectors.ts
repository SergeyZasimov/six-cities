import { State } from '../types/state';

export const getAuthorizationStatus = ( state: State ) => state.authorizationStatus;

export const getLocation = ( state: State ) => state.location;

export const getOffers = ( state: State ) => state.offers;

export const getCommentList = ( state: State ) => state.commentsList;

export const getRoom = ( state: State ) => state.room;

export const getNearbyOffers = ( state: State ) => state.nearbyOffers;

export const getUserName = ( state: State ) => state.userName;

export const getIsDataLoading = ( state: State ) => state.isDataLoading;

export const getIsDataSending = ( state: State ) => state.isDataSending;
