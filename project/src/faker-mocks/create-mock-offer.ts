import { Offer } from '../types/offer';
import { datatype, internet, lorem } from 'faker';
import { createMockHost } from './create-mock-host';
import { createMockCity } from './create-mock-city';
import { createMockLocation } from './create-mock-location';

export const createMockOffer = (): Offer => ({
  id: datatype.number(),
  images: Array.from({length: 6}, () => internet.url()),
  previewImage: internet.url(),
  title: lorem.words(3),
  description: lorem.words(10),
  isPremium: datatype.boolean(),
  type: lorem.words(1),
  rating: datatype.number({min: 1, max: 5}),
  bedrooms: datatype.number(5),
  maxAdults: datatype.number(5),
  price: datatype.number(),
  goods: Array.from({length: 4}, () => lorem.words(3)),
  host: createMockHost(),
  isFavorite: datatype.boolean(),
  city: createMockCity(),
  location: createMockLocation()
});
