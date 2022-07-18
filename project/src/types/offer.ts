import { City } from './city';
import { User } from './user';
import { Review } from './review';

export type Offer = {
  id: number;
  images: string[];
  title: string;
  description: string;
  isPremium: boolean;
  type: string;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: User;
  isFavorite: boolean;
  reviews: Review[];
  city: City;
};
