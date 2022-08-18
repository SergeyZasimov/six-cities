import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute, StateAction } from '../../const';
import { Offer } from '../../types/offer';
import { ThunkApiConfigType } from '../../types/state';

export const fetchRoomAction = createAsyncThunk<
  Offer,
  string,
  ThunkApiConfigType
>(StateAction.Room.LoadRoom, async (id, { extra: api }) => {
  const { data } = await api.get(`${ApiRoute.Offers}/${id}`);
  return data;
});
