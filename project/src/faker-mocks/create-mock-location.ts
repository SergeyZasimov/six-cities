import { Location } from '../types/location';
import { datatype } from 'faker';

export const createMockLocation = (): Location => ({
  latitude: datatype.float(),
  longitude: datatype.float(),
  zoom: datatype.number()
});
