import {
  AppRoute,
  AuthorizationStatus,
  CardType,
  MapType,
  MAX_RATING,
  SortType,
} from '../const';
import { Offer } from '../types/offer';

const getRatingStyle = ( rating: number, maxRating: number = MAX_RATING, ): { width: string } => {
  const width = ((rating / maxRating) * 100);
  return { width: `${width}%` };
};

const getRoundRatingStyle = ( rating: number, maxRating: number = MAX_RATING, ): { width: string } => {
  const width = ((Math.round(rating) / maxRating) * 100);
  return { width: `${width}%` };
};

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
  getCardType,
  getMapType,
  getSortOffers,
  checkAuthStatus,
  getRoundRatingStyle,
};
