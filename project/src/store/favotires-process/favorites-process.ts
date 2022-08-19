import { createSlice } from '@reduxjs/toolkit';
import { DomainNameSpace } from '../../const';
import { Offer } from '../../types/offer';
import { fetchFavoriteOffers, toggleFavorite } from './async-actions';

type FavoritesProcess = {
  favoriteOffers: Offer[];
};

const initialState: FavoritesProcess = {
  favoriteOffers: [],
};

export const favoritesProcess = createSlice({
  name: DomainNameSpace.Favorites,
  initialState,
  reducers: {
    resetFavorites: (state) => {
      state.favoriteOffers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { payload: offer } = action;

        if (offer.isFavorite) {
          state.favoriteOffers.push(offer);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter(
            (item) => item.id !== offer.id,
          );
        }
      });
  },
});

export const { resetFavorites } = favoritesProcess.actions;
