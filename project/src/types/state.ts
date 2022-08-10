import { store } from '../store';
import { AuthorizationStatus, DEFAULT_CITIES } from '../const';
import { Offer } from './offer';
import { Comment } from './comment';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userName: string;
}

export type DataProcess = {
  offers: Offer[],
  room: Offer | null,
  commentList: Comment[],
  nearbyOffers: Offer[],
  isDataLoading: boolean,
  isDataSending: boolean,
}

export type LocationProcess = {
  currentLocation: typeof DEFAULT_CITIES[number],
}
