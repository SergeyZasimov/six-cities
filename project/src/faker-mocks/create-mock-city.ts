import { City } from '../types/city';
import { DEFAULT_CITIES } from '../const';
import { datatype } from 'faker';
import { createMockLocation } from './create-mock-location';

export const createMockCity = ( options = {} ): City => {
  const city = {
    name: DEFAULT_CITIES[datatype.number({ min: 0, max: DEFAULT_CITIES.length - 1 })],
    location: createMockLocation()
  };
  return { ...city, ...options };
};
