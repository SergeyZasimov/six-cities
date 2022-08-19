import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute, StateAction } from '../../const';
import { Offer } from '../../types/offer';
import { ThunkApiConfigType } from '../../types/state';

export const fetchNearbyOffers = createAsyncThunk<
  Offer[],
  string,
  ThunkApiConfigType
>(StateAction.NearbyOffers.LoadNearbyOffers, async (id, { extra: api }) => {
  const { data } = await api.get<Offer[]>(`${ApiRoute.Offers}/${id}/nearby`);
  return data;
});
