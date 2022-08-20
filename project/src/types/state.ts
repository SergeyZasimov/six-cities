import { store } from '../store';
import { AuthorizationStatus, DEFAULT_CITIES, LoadingStatus, SendingStatus } from '../const';
import { AxiosInstance } from 'axios';
import { Offer } from './offer';
import { Comment } from './comment';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userName: string;
};

export type LocationProcess = {
  currentLocation: typeof DEFAULT_CITIES[number];
};

export type RoomProcess = {
  room: Offer;
  status: LoadingStatus;
};

export type CommentsProcess = {
  commentsList: Comment[];
  status: SendingStatus;
};

export type FavoritesProcess = {
  favoriteOffers: Offer[];
};

export type NearbyOffersProcess = {
  nearbyOffers: Offer[];
};

export type ThunkApiConfigType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};
