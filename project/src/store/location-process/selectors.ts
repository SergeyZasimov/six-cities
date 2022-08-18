import { DomainNameSpace } from '../../const';
import { State } from '../../types/state';

export const getLocation = (state: State) =>
  state[DomainNameSpace.Location].currentLocation;
