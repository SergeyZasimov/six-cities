import { City } from './city';
import { User } from './user';
import { Location } from './location';

export type Offer = {
  id: number;
  images: string[];
  previewImage: string;
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
  city: City;
  location: Location;
};
