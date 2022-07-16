import { HousingType } from '../const';
import { Offer } from '../types/offer';
import { owners } from './owners';
import { reviews } from './reviews';

export const offers: Offer[] = [
  {
    id: 1,
    images: ['./apartments-images/apartment-01.jpg'],
    title: 'Beautiful & luxurious studio at great location',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum molestiae dolor molestias iste temporibus, nulla totam quam cumque minus blanditiis voluptate ex voluptas unde obcaecati possimus similique? Eum, nesciunt cupiditate!',
    isPremium: false,
    type: HousingType.Room,
    rating: 4,
    bedrooms: 1,
    maxGuests: 2,
    nightPrice: 34,
    features: ['Wi-Fi', 'Washing machine'],
    owner: owners.angelina,
    isFavorite: true,
    reviews: reviews,
  },
  {
    id: 2,
    images: ['./apartments-images/apartment-02.jpg'],
    title: 'Lorem ipsum dolor sit amet',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum molestiae dolor molestias iste temporibus, nulla totam quam cumque minus blanditiis voluptate ex voluptas unde obcaecati possimus similique? Eum, nesciunt cupiditate!',
    isPremium: true,
    type: HousingType.Hotel,
    rating: 3,
    bedrooms: 5,
    maxGuests: 5,
    nightPrice: 50,
    features: [
      'Wi-Fi',
      'Washing machine',
      'Coffee machine',
      'Dishwasher',
      'Fridge',
      'Kitchen',
    ],
    owner: owners.angelina,
    isFavorite: false,
    reviews: reviews,
  },
  {
    id: 3,
    images: ['./apartments-images/apartment-03.jpg'],
    title: 'Perspiciatis deserunt molestias ab assumenda sit modi quae',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum molestiae dolor molestias iste temporibus, nulla totam quam cumque minus blanditiis voluptate ex voluptas unde obcaecati possimus similique? Eum, nesciunt cupiditate!',
    isPremium: false,
    type: HousingType.House,
    rating: 4,
    bedrooms: 2,
    maxGuests: 3,
    nightPrice: 23,
    features: ['Wi-Fi', 'Washing machine', 'Baby Seat', 'Cabel TV'],
    owner: owners.max,
    isFavorite: true,
    reviews: reviews,
  },
  {
    id: 4,
    images: ['./apartments-images/apartment-02.jpg'],
    title: 'Quaerat facere blanditiis accusantium ea',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum molestiae dolor molestias iste temporibus, nulla totam quam cumque minus blanditiis voluptate ex voluptas unde obcaecati possimus similique? Eum, nesciunt cupiditate!',
    isPremium: true,
    type: HousingType.Apartment,
    rating: 5,
    bedrooms: 1,
    maxGuests: 2,
    nightPrice: 100,
    features: [
      'Wi-Fi',
      'Washing machine',
      'Baby Seat',
      'Cabel TV',
      'Heating',
      'Dishwasher',
      'Fridge',
      'Kitchen',
    ],
    owner: owners.max,
    isFavorite: false,
    reviews: reviews,
  },
];
