import { DEFAULT_CITIES } from '../const';
import { Location } from './location';

export type Cities = typeof DEFAULT_CITIES;

export type City = {
  name: typeof DEFAULT_CITIES[number];
  location: Location;
};
