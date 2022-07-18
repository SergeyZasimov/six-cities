import { Setting } from '../const';

const getRatingStyle = (rating: number, maxRating: number = Setting.MAX_RATING): { width: string } => {
  const width = ((rating / maxRating) * 100).toString();
  return { width: `${width}%` };
};

const setFavoriteButtonClassName = (isFavorite:boolean, screen: string): string =>
  isFavorite
    ? `${screen}__bookmark-button ${screen}__bookmark-button--active button`
    : `${screen}__bookmark-button button`;

export { getRatingStyle, setFavoriteButtonClassName };
