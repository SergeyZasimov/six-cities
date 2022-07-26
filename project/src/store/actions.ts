import { createAction } from '@reduxjs/toolkit';
import { StateAction } from '../const';
import { Offer } from '../types/offer';

export const changeLocation = createAction<{ location: string }>(
  StateAction.Location.ChangeLocation,
);

export const getOffers = createAction<{ locationOffers: Offer[] }>(
  StateAction.Offer.GetOffers,
);
