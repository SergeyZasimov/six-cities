import { State } from '../../types/state';

export const getFavoriteOffers = (state: State) =>
  state.Favorites.favoriteOffers;
