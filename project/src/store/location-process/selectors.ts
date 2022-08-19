import { State } from '../../types/state';

export const getLocation = (state: State) =>
  state.Location.currentLocation;
