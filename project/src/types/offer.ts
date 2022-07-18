import { City } from './city';
import { User } from './user';
import { Comment } from './comment';

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
  comments: Comment[];
  city: City;
};
