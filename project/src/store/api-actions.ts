import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute, StateAction } from '../const';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { loadOffers, setLoadOffersStatus } from './actions';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(StateAction.Offer.LoadOffers, async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer[]>(ApiRoute.Offers);
  dispatch(loadOffers(data));
  dispatch(setLoadOffersStatus(false));
});
