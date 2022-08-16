import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute, AppRoute, StateAction } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { redirectToRoute } from './actions';
import { toast } from 'react-toastify';
import { Comment, CommentData } from '../types/comment';

type ThunkApiConfigType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, ThunkApiConfigType>(
  StateAction.Data.LoadOffers, async ( _arg, { extra: api } ) => {
    try {
      const { data } = await api.get(ApiRoute.Offers);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  });

export const fetchRoomAction = createAsyncThunk<{ room: Offer, comments: Comment[], nearbyOffers: Offer[] }, string, ThunkApiConfigType>(
  StateAction.Data.LoadRoom,
  async ( id, { extra: api } ) => {
    const { data: room } = await api.get<Offer>(
      `${ApiRoute.Offers}/${id}`
    );

    const { data: comments } = await api.get<Comment[]>(
      `${ApiRoute.Comments}/${id}`,
    );

    const { data: nearbyOffers } = await api.get<Offer[]>(
      `${ApiRoute.Offers}/${id}/nearby`,
    );

    return { room, comments, nearbyOffers };
  }
);

export const fetchFavoriteOffers = createAsyncThunk<Offer[], undefined, ThunkApiConfigType>(
  StateAction.Data.LoadFavorites,
  async(_arg, {extra: api}) => {
    const {data} = await api.get(ApiRoute.Favorite);
    return data;
  }
);

export const toggleFavorite = createAsyncThunk<Offer, {id: number, status: number}, ThunkApiConfigType>(
  StateAction.Data.ToggleFavorite,
  async({id, status}, {extra: api}) => {
    const {data} = await api.post<Offer>(`${ApiRoute.Favorite}/${id}/${status}`);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<string, undefined, ThunkApiConfigType>(
  StateAction.User.CheckAuth,
  async ( _arg, { extra: api } ) => {
    const {
      data: { email: userName },
    } = await api.get(ApiRoute.Login);
    return userName;
  });

export const loginAction = createAsyncThunk<string, AuthData, ThunkApiConfigType>(
  StateAction.User.Login,
  async ( { login: email, password }, { dispatch, extra: api } ) => {
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

export const logoutAction = createAsyncThunk<void, undefined, ThunkApiConfigType>(
  StateAction.User.Logout, async ( _arg, { dispatch, extra: api } ) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  });

export const sendNewComment = createAsyncThunk<Comment[], CommentData, ThunkApiConfigType>(
  StateAction.Data.SendNewComment,
  async ( { roomId, rating, comment }, { dispatch, extra: api } ) => {
    const { data } = await api.post(
      `${ApiRoute.Comments}/${roomId}`,
      {
        rating,
        comment,
      });
    return data;
  },
);
