import { createSlice } from '@reduxjs/toolkit';
import { DomainNameSpace } from '../../const';
import { fetchFavoriteOffers, toggleFavorite } from './async-actions';
import { FavoritesProcess } from '../../types/state';


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
