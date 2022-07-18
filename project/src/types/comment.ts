import { User } from './user';

export type Comment = {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  user: User;
}
