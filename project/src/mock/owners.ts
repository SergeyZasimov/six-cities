import { Owner } from '../types/owner';

export const owners: {[person: string]: Owner} = {
  angelina: {
    id: 1,
    avatar: './avatars/avatar-angelina.jpg',
    name: 'Angelina',
    isPro: true,
  },
  max: {
    id: 2,
    avatar: './avatars/avatar-max.jpg',
    name: 'Max',
    isPro: false,
  },
};
