enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer',
  NotFound = '*',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum HousingType {
  Apartment = 'Apartment',
  Room = 'Private room',
  House = 'House',
  Hotel = 'Hotel',
}

enum Setting {
  MaxRating = 5,
  NearPlaceseCount = 3,
}

enum IconUrl {
  Default = './img/pin.svg',
  Active = './img/pin-active.svg',
}

enum CardType {
  Cities = 'cities',
  Favorites = 'favorites',
  NearPlaces = 'near-places',
}

enum MapType {
  Cities = 'cities',
  Property = 'property',
}

const StateAction = {
  Location: {
    ChangeLocation: 'location/changeLocation'
  },
  Offer: {
    GetOffers: 'offer/getOffers'
  }
} as const;

const DEFAULT_CITY_NAME = 'Paris';

export {
  AppRoute,
  AuthorizationStatus,
  HousingType,
  Setting,
  IconUrl,
  CardType,
  MapType,
  StateAction,
  DEFAULT_CITY_NAME,
};
