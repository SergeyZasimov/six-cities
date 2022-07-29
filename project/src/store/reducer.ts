import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY_NAME } from '../const';
import { Offer } from '../types/offer';
import { changeLocation, loadOffers } from './actions';

const initialState = {
  location: DEFAULT_CITY_NAME,
  offers: [] as Offer[],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLocation, (state, action) => {
      const { location } = action.payload;
      state.location = location;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
