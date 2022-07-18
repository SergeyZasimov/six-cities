import { Comment } from '../types/comment';
import { users } from './users';

export const comments: Comment[] = [
  {
    id: 1,
    user: users.angelina,
    name: 'Angelina',
    rating: 4,
    date: 'June 2022',
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime laborum veniam et aspernatur quibusdam ipsum!',
  },
  {
    id: 2,
    user: users.max,
    name: 'Max',
    rating: 5,
    date: 'July 2022',
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime laborum veniam et aspernatur quibusdam ipsum!',
  },
];
