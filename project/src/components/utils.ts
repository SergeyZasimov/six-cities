import { AppRoute, CardType, MapType, Setting } from '../const';

const getRatingStyle = (
  rating: number,
  maxRating: number = Setting.MaxRating,
): { width: string } => {
  const width = ((rating / maxRating) * 100).toString();
  return { width: `${width}%` };
};

const setFavoriteButtonClassName = (
  isFavorite: boolean,
  screen: string,
): string =>
  isFavorite
    ? `${screen}__bookmark-button ${screen}__bookmark-button--active button`
    : `${screen}__bookmark-button button`;

const getCardType = (pathname: string): string => {
  if (pathname.includes(AppRoute.Room)) {
    return CardType.NearPlaces;
  }

  if (pathname.includes(AppRoute.Favorites)) {
    return CardType.Favorites;
  }

  return CardType.Cities;
};

const getMapType = (pathname: string): string => {
  if (pathname.includes(AppRoute.Room)) {
    return MapType.Property;
  }

  return MapType.Cities;
};

export { getRatingStyle, setFavoriteButtonClassName, getCardType, getMapType };
