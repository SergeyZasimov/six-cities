import { User } from './user';

export type Review = {
  id: number;
  name: string;
  rating: number;
  date: string;
  review: string;
  user: User;
};
