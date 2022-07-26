import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY_NAME } from '../const';
import { offers } from '../mock/offers';
import { changeLocation, getOffers } from './actions';

const initialState = {
  location: DEFAULT_CITY_NAME,
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLocation, (state, action) => {
      const { location } = action.payload;
      state.location = location;
    })
    .addCase(getOffers, (state, action) => {
      const { locationOffers } = action.payload;
      state.offers = locationOffers;
    });
});

export { reducer };
