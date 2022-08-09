import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, DEFAULT_CITY_NAME } from '../const';
import { Comment } from '../types/comment';
import { Offer } from '../types/offer';
import {
  changeLocation,
  setCommentList,
  setNearbyOffers,
  setRoom,
  setOffers,
  setAuthorizationStatus,
  setLoadDataStatus,
  setServerError,
  setUserName,
} from './actions';

type InitState = {
  location: string;
  offers: Offer[];
  isDataLoaded: boolean;
  authorizationStatus: AuthorizationStatus;
  serverError: string | null;
  commentsList: Comment[];
  room: Offer | null;
  nearbyOffers: Offer[];
  userName: string;
};

const initialState: InitState = {
  location: DEFAULT_CITY_NAME,
  offers: [],
  isDataLoaded: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  serverError: null,
  commentsList: [],
  room: null,
  nearbyOffers: [],
  userName: '',
};

// todo: оптимизировать код редьюсера после изучения раздела 8
const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLocation, (state, action) => {
      const { location } = action.payload;
      state.location = location;
    })
    .addCase(setOffers, ( state, action) => {
      state.offers = action.payload;
    })
    .addCase(setLoadDataStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setAuthorizationStatus, ( state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setServerError, (state, action) => {
      state.serverError = action.payload;
    })
    .addCase(setCommentList, ( state, action) => {
      state.commentsList = action.payload;
    })
    .addCase(setRoom, ( state, action) => {
      state.room = action.payload;
    })
    .addCase(setNearbyOffers, ( state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setUserName, (state, action) => {
      state.userName = action.payload;
    });
});

export { reducer };
