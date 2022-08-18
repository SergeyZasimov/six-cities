import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute, StateAction } from '../../const';
import { Offer } from '../../types/offer';
import { ThunkApiConfigType } from '../../types/state';
import { toggleNearbyOffersFavorite } from '../nearby-offers-process/nearby-offers-process';
import { toggleFavoriteOffers } from '../offers-process/offers-process';
import { toggleRoomFavorite } from '../room-process/room-process';

export const fetchFavoriteOffers = createAsyncThunk<
  Offer[],
  undefined,
  ThunkApiConfigType
>(StateAction.Favorites.LoadFavorites, async (_arg, { extra: api }) => {
  const { data } = await api.get(ApiRoute.Favorite);
  return data;
});

export const toggleFavorite = createAsyncThunk<
  Offer,
  { id: number; status: number },
  ThunkApiConfigType
>(
  StateAction.Favorites.ToggleFavorite,
  async ({ id, status }, { dispatch, extra: api }) => {
    const { data } = await api.post<Offer>(
      `${ApiRoute.Favorite}/${id}/${status}`,
    );
    dispatch(toggleFavoriteOffers(data as Offer));
    dispatch(toggleRoomFavorite(data as Offer));
    dispatch(toggleNearbyOffersFavorite(data as Offer));

    return data as Offer;
  },
);
