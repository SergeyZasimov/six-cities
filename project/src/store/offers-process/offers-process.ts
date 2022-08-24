import { createSlice } from '@reduxjs/toolkit';
import { DomainNameSpace, LoadingStatus } from '../../const';
import { fetchOffersAction } from './async-actions';
import { OffersProcess } from '../../types/state';

const initialState: OffersProcess = {
  offers: [],
  status: LoadingStatus.Idle,
};

export const offersProcess = createSlice({
  name: DomainNameSpace.Offers,
  initialState,
  reducers: {
    toggleFavoriteOffers: (state, action) => {
      const { payload: offer } = action;
      const updatedOffer = state.offers.find((item) => item.id === offer.id);
      if (updatedOffer) {
        updatedOffer.isFavorite = !updatedOffer.isFavorite;
      }
    },
    resetFavoritesOffers: (state) => {
      state.offers.forEach((offer) => {
        offer.isFavorite = false;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.status = LoadingStatus.Success;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.status = LoadingStatus.Failed;
      });
  },
});

export const { toggleFavoriteOffers, resetFavoritesOffers } = offersProcess.actions;
