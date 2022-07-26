import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

export const changeLocation = createAction<{ location: string }>('changeLocation');

export const getOffers = createAction<{ locationOffers: Offer[] }>('getOffers');
