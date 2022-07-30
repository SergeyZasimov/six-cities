import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY_NAME } from '../const';
import { Offer } from '../types/offer';
import { changeLocation, loadOffers, setLoadOffersStatus } from './actions';

type InitState = {
  location: string,
  offers: Offer[],
  isDataLoaded: boolean,
}

const initialState: InitState = {
  location: DEFAULT_CITY_NAME,
  offers: [],
  isDataLoaded: true,
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
    });
});

export { reducer };
