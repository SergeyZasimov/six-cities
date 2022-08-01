import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, StateAction } from '../const';
import { Offer } from '../types/offer';

export const changeLocation = createAction<{ location: string }>(
  StateAction.Location.ChangeLocation,
);

export const loadOffers = createAction<Offer[]>(StateAction.Offer.LoadOffers);

export const setLoadOffersStatus = createAction<boolean>(
  StateAction.Offer.LoadStatus,
);

export const requireAuthorization = createAction<AuthorizationStatus>(
  StateAction.User.RequireAuthorization,
);

export const setServerError = createAction<string | null>(StateAction.Error.ServerError);
