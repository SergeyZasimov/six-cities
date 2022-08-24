import { changeLocation, locationProcess } from './location-process';
import { LocationProcess } from '../../types/state';

describe('Reducer: locationProcess', () => {
  it('should return initial state', () => {
    expect(locationProcess.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ currentLocation: 'Paris' });
  });

  it('should change current location', () => {
    const state: LocationProcess = { currentLocation: 'Paris' };
    expect(locationProcess.reducer(state, changeLocation('Amsterdam')))
      .toEqual({ currentLocation: 'Amsterdam' });
  });
});
