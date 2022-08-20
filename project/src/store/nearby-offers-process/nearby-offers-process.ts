import { createSlice } from '@reduxjs/toolkit';
import { DomainNameSpace } from '../../const';
import { fetchNearbyOffers } from './async-actions';
import { NearbyOffersProcess } from '../../types/state';

const initialState: NearbyOffersProcess = {
  nearbyOffers: [],
};

export const nearbyOffersProcess = createSlice({
  name: DomainNameSpace.NearbyOffers,
  initialState,
  reducers: {
    toggleFavoriteNearbyOffers: (state, action) => {
      const { payload: offer } = action;
      const updatedNearbyOffer = state.nearbyOffers.find(
        (item) => item.id === offer.id,
      );
      if (updatedNearbyOffer) {
        updatedNearbyOffer.isFavorite = !updatedNearbyOffer.isFavorite;
      }
    },
    resetFavoritesNearbyOffers: (state) => {
      state.nearbyOffers.forEach((offer) => {
        offer.isFavorite = false;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
    });
  },
});

export const {
  toggleFavoriteNearbyOffers,
  resetFavoritesNearbyOffers,
} = nearbyOffersProcess.actions;
