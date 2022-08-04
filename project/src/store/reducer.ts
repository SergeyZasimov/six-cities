import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, DEFAULT_CITY_NAME } from '../const';
import { Comment } from '../types/comment';
import { Offer } from '../types/offer';
import {
  changeLocation,
  loadComments,
  loadNearbyOffers,
  loadOffer,
  loadOffers,
  requireAuthorization,
  setLoadOffersStatus,
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
  offer: Offer | null;
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
  offer: null,
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
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setLoadOffersStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setServerError, (state, action) => {
      state.serverError = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.commentsList = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setUserName, (state, action) => {
      state.userName = action.payload;
    });
});

export { reducer };
