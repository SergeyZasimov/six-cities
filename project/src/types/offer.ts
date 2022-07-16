import { Owner } from './owner';
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
  maxGuests: number;
  nightPrice: number;
  features: string[];
  owner: Owner;
  isFavorite: boolean;
  reviews: Review[];
}
