import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute, AppRoute, AuthorizationStatus, StateAction } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import {
  setCommentList,
  setNearbyOffers,
  setRoom,
  setOffers,
  redirectToRoute,
  setAuthorizationStatus,
  setLoadDataStatus,
  setUserName,
} from './actions';
import { toast } from 'react-toastify';
import { Comment, CommentData } from '../types/comment';

type ThunkApiConfigType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<void,
  undefined,
  ThunkApiConfigType>(StateAction.Offer.LoadOffers, async ( _arg, { dispatch, extra: api } ) => {
    const { data } = await api.get<Offer[]>(ApiRoute.Offers);
    dispatch(setOffers(data));
    dispatch(setLoadDataStatus(false));
  });

export const fetchRoomAction = createAsyncThunk<void,
  string,
  ThunkApiConfigType>(StateAction.Offer.LoadOffer, async ( id, { dispatch, extra: api } ) => {
    const { data: room } = await api.get<Offer>(`${ApiRoute.Offers}/${id}`);
    const { data: comments } = await api.get<Comment[]>(
      `${ApiRoute.Comments}/${id}`,
    );
    const { data: nearbyOffers } = await api.get<Offer[]>(
      `${ApiRoute.Offers}/${id}/nearby`,
    );
    dispatch(setRoom(room));
    dispatch(setCommentList(comments));
    dispatch(setNearbyOffers(nearbyOffers));
  });

export const checkAuthAction = createAsyncThunk<void,
  undefined,
  ThunkApiConfigType>(StateAction.User.CheckAuth, async ( _arg, { dispatch, extra: api } ) => {
    try {
      const {
        data: { email: userName },
      } = await api.get(ApiRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUserName(userName));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  });

export const loginAction = createAsyncThunk<void, AuthData, ThunkApiConfigType>(
  StateAction.User.Login,
  async ( { login: email, password }, { dispatch, extra: api } ) => {
    const {
      data: { email: userName, token },
    } = await api.post<UserData>(ApiRoute.Login, { email, password });
    saveToken(token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserName(userName));
    dispatch(redirectToRoute(AppRoute.Main));
    toast.success('You successfully login');
  },
);

export const logoutAction = createAsyncThunk<void,
  undefined,
  ThunkApiConfigType>(StateAction.User.Logout, async ( _arg, { dispatch, extra: api } ) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  });

export const sendNewComment = createAsyncThunk<Comment[],
  CommentData,
  ThunkApiConfigType>(
    StateAction.Comment.SendNewComment,
    async ( { roomId, rating, comment }, { dispatch, extra: api } ) => {
      const { data } = await api.post(`${ApiRoute.Comments}/${roomId}`, {
        rating,
        comment,
      });
      return data;
    },
  );
