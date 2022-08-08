import {
  AppRoute,
  AuthorizationStatus,
  CardType,
  MapType,
  MAX_RATING,
  SortType,
} from '../const';
import { Offer } from '../types/offer';

const getRatingStyle = (
  rating: number,
  maxRating: number = MAX_RATING,
): { width: string } => {
  const width = ((rating / maxRating) * 100);
  return { width: `${width}%` };
};

const setFavoriteButtonClassName = (
  isFavorite: boolean,
  screen: string,
): string =>
  isFavorite
    ? `${screen}__bookmark-button ${screen}__bookmark-button--active button`
    : `${screen}__bookmark-button button`;

const getCardType = ( pathname: string ): string => {
  if (pathname.includes(AppRoute.Room)) {
    return CardType.NearPlaces;
  }

  if (pathname.includes(AppRoute.Favorites)) {
    return CardType.Favorites;
  }

  return CardType.Cities;
};

const getMapType = ( pathname: string ): string => {
  if (pathname.includes(AppRoute.Room)) {
    return MapType.Property;
  }

  return MapType.Cities;
};

const getSortOffers = ( sortType: string, offers: Offer[] ) => {
  switch (sortType) {
    case SortType.PriceHighToLow:
      return offers.sort(
        ( offerA: Offer, offerB: Offer ) => offerB.price - offerA.price,
      );
      break;
    case SortType.PriceLowToHigh:
      return offers.sort(
        ( offerA: Offer, offerB: Offer ) => offerA.price - offerB.price,
      );
      break;
    case SortType.TopRatedFirst:
      return offers.sort(
        ( offerA: Offer, offerB: Offer ) => offerB.rating - offerA.rating,
      );
      break;
    default:
      return offers;
  }
};

const checkAuthStatus = ( authStatus: AuthorizationStatus ): boolean =>
  authStatus === AuthorizationStatus.Unknown;

export {
  getRatingStyle,
  setFavoriteButtonClassName,
  getCardType,
  getMapType,
  getSortOffers,
  checkAuthStatus,
};
