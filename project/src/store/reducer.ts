import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, DEFAULT_CITY_NAME } from '../const';
import { Offer } from '../types/offer';
import {
  changeLocation,
  loadOffers,
  requireAuthorization,
  setLoadOffersStatus,
} from './actions';

type InitState = {
  location: string;
  offers: Offer[];
  isDataLoaded: boolean;
  authorizationStatus: AuthorizationStatus;
};

const initialState: InitState = {
  location: DEFAULT_CITY_NAME,
  offers: [],
  isDataLoaded: true,
  authorizationStatus: AuthorizationStatus.Unknown,
};

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
    });
});

export { reducer };
