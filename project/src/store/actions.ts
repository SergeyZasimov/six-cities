import { createAction } from '@reduxjs/toolkit';
import { StateAction } from '../const';
import { Offer } from '../types/offer';

export const changeLocation = createAction<{ location: string }>(
  StateAction.Location.ChangeLocation,
);

export const loadOffers = createAction<Offer[]>(StateAction.Offer.LoadOffers);

export const setLoadOffersStatus = createAction<boolean>(
  StateAction.Offer.LoadStatus,
);
