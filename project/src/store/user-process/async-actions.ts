import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { StateAction, ApiRoute, AppRoute } from '../../const';
import { saveToken, dropToken } from '../../services/token';
import { AuthData } from '../../types/auth-data';
import { ThunkApiConfigType } from '../../types/state';
import { redirectToRoute } from '../actions';
import { resetFavorites } from '../favotires-process/favorites-process';
import { resetFavoritesNearbyOffers } from '../nearby-offers-process/nearby-offers-process';
import { resetFavoritesOffers } from '../offers-process/offers-process';
import { resetFavoritesRoom } from '../room-process/room-process';

export const checkAuthAction = createAsyncThunk<
  string,
  undefined,
  ThunkApiConfigType
>(StateAction.User.CheckAuth, async (_arg, { extra: api }) => {
  const {
    data: { email: userName },
  } = await api.get(ApiRoute.Login);
  return userName;
});

export const loginAction = createAsyncThunk<
  string,
  AuthData,
  ThunkApiConfigType
>(
  StateAction.User.Login,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const {
        data: { email: userName, token },
      } = await api.post(ApiRoute.Login, { email, password });
      saveToken(token);
      dispatch(redirectToRoute(AppRoute.Main));
      toast.success('You successfully login');
      return userName;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  },
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  ThunkApiConfigType
>(StateAction.User.Logout, async (_arg, { dispatch, extra: api }) => {
  await api.delete(ApiRoute.Logout);
  dropToken();
  dispatch(resetFavoritesOffers());
  dispatch(resetFavorites());
  dispatch(resetFavoritesRoom());
  dispatch(resetFavoritesNearbyOffers());
});
