import { Offer } from '../types/offer';
import { datatype, internet, lorem } from 'faker';
import { createMockHost } from './create-mock-host';
import { createMockCity } from './create-mock-city';
import { createMockLocation } from './create-mock-location';

type optionKeys = keyof Offer;
type optionValues = Offer[keyof Offer]

export const createMockOffer = ( options: { [key in optionKeys as string]: optionValues } = {} ): Offer => {
  const offer = {
    id: datatype.number({min: 10}),
    images: Array.from({ length: 6 }, () => internet.url()),
    previewImage: internet.url(),
    title: lorem.words(3),
    description: lorem.words(10),
    isPremium: datatype.boolean(),
    type: lorem.words(1),
    rating: datatype.number({ min: 1, max: 5 }),
    bedrooms: datatype.number(5),
    maxAdults: datatype.number(5),
    price: datatype.number(),
    goods: Array.from({ length: 4 }, () => lorem.words(3)),
    host: createMockHost(),
    isFavorite: datatype.boolean(),
    city: createMockCity(),
    location: createMockLocation()
  };
  return { ...offer, ...options };
};

export const createMockOffers = ( count: number, options: { [key in optionKeys as string]: optionValues } = {} ): Offer[] =>
  Array.from({ length: count }, () => createMockOffer(options));
