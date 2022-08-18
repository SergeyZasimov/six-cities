import { DomainNameSpace } from '../../const';
import { State } from '../../types/state';

export const getFavoriteOffers = (state: State) =>
  state[DomainNameSpace.Favorites].favoriteOffers;
