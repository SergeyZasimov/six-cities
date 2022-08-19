import { combineReducers } from '@reduxjs/toolkit';
import { DomainNameSpace } from '../const';
import { userProcess } from './user-process/user-process';
import { favoritesProcess } from './favotires-process/favorites-process';
import { locationProcess } from './location-process/location-process';
import { offersProcess } from './offers-process/offers-process';
import { roomProcess } from './room-process/room-process';
import { nearbyOffersProcess } from './nearby-offers-process/nearby-offers-process';
import { commentsProcess } from './comments-process/comments-process';

export const rootReducer = combineReducers({
  [DomainNameSpace.User]: userProcess.reducer,
  [DomainNameSpace.Offers]: offersProcess.reducer,
  [DomainNameSpace.Room]: roomProcess.reducer,
  [DomainNameSpace.NearbyOffers]: nearbyOffersProcess.reducer,
  [DomainNameSpace.Comments]: commentsProcess.reducer,
  [DomainNameSpace.Location]: locationProcess.reducer,
  [DomainNameSpace.Favorites]: favoritesProcess.reducer,
});
