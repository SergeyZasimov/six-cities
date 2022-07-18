import { Owner } from '../types/owner';

export const owners: {[person: string]: Owner} = {
  angelina: {
    id: 1,
    avatar: './img/avatar-angelina.jpg',
    name: 'Angelina',
    isPro: true,
  },
  max: {
    id: 2,
    avatar: './img/avatar-max.jpg',
    name: 'Max',
    isPro: false,
  },
};
