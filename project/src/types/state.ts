import { store } from '../store';
import { AuthorizationStatus, DEFAULT_CITIES, SendingStatus } from '../const';
import { Offer } from './offer';
import { Comment } from './comment';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userName: string;
};

export type DataProcess = {
  offers: Offer[];
  room: Offer | null;
  commentList: Comment[];
  nearbyOffers: Offer[];
  isDataLoading: boolean;
  sendingStatus: SendingStatus;
  favoriteOffers: Offer[];
};

export type LocationProcess = {
  currentLocation: typeof DEFAULT_CITIES[number];
};

export type FavoriteProcess = {
  currentFavoriteOffer: Offer | null;
};
