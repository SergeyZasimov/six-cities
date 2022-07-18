import { Setting } from '../const';
import { Offer } from '../types/offer';

const getRating = (rating: number, maxRating: number = Setting.MAX_RATING): { width: string } => {
  const width = ((rating / maxRating) * 100).toString();
  return { width: `${width}%` };
};

const setFavoriteButtonClassName = (offer: Offer): string =>
  offer.isFavorite
    ? 'place-card__bookmark-button place-card__bookmark-button--active button'
    : 'place-card__bookmark-button button';

export { getRating, setFavoriteButtonClassName };
