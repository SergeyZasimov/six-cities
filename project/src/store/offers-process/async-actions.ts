import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute, StateAction } from '../../const';
import { Offer } from '../../types/offer';
import { AppDispatch, State } from '../../types/state';

type ThunkApiConfigType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  ThunkApiConfigType
>(StateAction.Offers.LoadOffers, async (_arg, { extra: api }) => {
  const { data } = await api.get(ApiRoute.Offers);
  return data;
});
