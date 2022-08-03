import { CITIES } from '../const';
import { Location } from './location';

export type Cities = typeof CITIES;

export type City = {
  name: typeof CITIES[number];
  location: Location;
};
