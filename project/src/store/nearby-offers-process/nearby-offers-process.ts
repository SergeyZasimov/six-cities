import { createSlice } from '@reduxjs/toolkit';
import { DomainNameSpace } from '../../const';
import { Offer } from '../../types/offer';
import { fetchNearbyOffers } from './async-actions';

type NearbyOffersProcess = {
  nearbyOffers: Offer[];
};

const initialState: NearbyOffersProcess = {
  nearbyOffers: [],
};

export const nearbyOffersProcess = createSlice({
  name: DomainNameSpace.NearbyOffers,
  initialState,
  reducers: {
    toggleNearbyOffersFavorite: (state, action) => {
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

export const { toggleNearbyOffersFavorite, resetFavoritesNearbyOffers } = nearbyOffersProcess.actions;
