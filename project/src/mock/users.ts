import { User } from '../types/user';

export const users: {[person: string]: User} = {
  angelina: {
    id: 1,
    avatarUrl: './img/avatar-angelina.jpg',
    name: 'Angelina',
    isPro: true,
  },
  max: {
    id: 2,
    avatarUrl: './img/avatar-max.jpg',
    name: 'Max',
    isPro: false,
  },
};
