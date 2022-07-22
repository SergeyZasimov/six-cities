import { HousingType } from '../const';
import { Offer } from '../types/offer';
import { users } from './users';
import { comments } from './comments';
import { cities } from './cities';

export const offers: Offer[] = [
  {
    id: 1,
    images: ['./img/apartment-01.jpg', './img/apartment-03.jpg'],
    title: 'Beautiful & luxurious studio at great location',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum molestiae dolor molestias iste temporibus, nulla totam quam cumque minus blanditiis voluptate ex voluptas unde obcaecati possimus similique? Eum, nesciunt cupiditate!',
    isPremium: false,
    type: HousingType.Room,
    rating: 3.5,
    bedrooms: 1,
    maxAdults: 2,
    price: 34,
    goods: ['Wi-Fi', 'Washing machine'],
    host: users.angelina,
    isFavorite: true,
    comments: comments,
    city: cities.amsterdam,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10,
    }
  },
  {
    id: 2,
    images: ['./img/apartment-02.jpg'],
    title: 'Lorem ipsum dolor sit amet',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum molestiae dolor molestias iste temporibus, nulla totam quam cumque minus blanditiis voluptate ex voluptas unde obcaecati possimus similique? Eum, nesciunt cupiditate!',
    isPremium: true,
    type: HousingType.Hotel,
    rating: 3,
    bedrooms: 5,
    maxAdults: 5,
    price: 50,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Coffee machine',
      'Dishwasher',
      'Fridge',
      'Kitchen',
    ],
    host: users.angelina,
    isFavorite: false,
    comments: comments,
    city: cities.amsterdam,
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 10,
    }
  },
  {
    id: 3,
    images: ['./img/apartment-03.jpg'],
    title: 'Perspiciatis deserunt molestias ab assumenda sit modi quae',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum molestiae dolor molestias iste temporibus, nulla totam quam cumque minus blanditiis voluptate ex voluptas unde obcaecati possimus similique? Eum, nesciunt cupiditate!',
    isPremium: false,
    type: HousingType.House,
    rating: 4,
    bedrooms: 2,
    maxAdults: 3,
    price: 23,
    goods: ['Wi-Fi', 'Washing machine', 'Baby Seat', 'Cabel TV'],
    host: users.max,
    isFavorite: true,
    comments: comments,
    city: cities.amsterdam,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 10,
    }
  },
  {
    id: 4,
    images: ['./img/apartment-02.jpg'],
    title: 'Quaerat facere blanditiis accusantium ea',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum molestiae dolor molestias iste temporibus, nulla totam quam cumque minus blanditiis voluptate ex voluptas unde obcaecati possimus similique? Eum, nesciunt cupiditate!',
    isPremium: true,
    type: HousingType.Apartment,
    rating: 5,
    bedrooms: 1,
    maxAdults: 2,
    price: 100,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Baby Seat',
      'Cabel TV',
      'Heating',
      'Dishwasher',
      'Fridge',
      'Kitchen',
    ],
    host: users.max,
    isFavorite: true,
    comments: comments,
    city: cities.amsterdam,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 10,
    }
  },
];
