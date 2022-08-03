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
  NearPlacesCount = 3,
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

enum ApiRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}

const SortType = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
} as const;

const StateAction = {
  Location: {
    ChangeLocation: 'location/changeLocation',
  },
  Offer: {
    LoadOffers: 'offer/loadOffers',
    LoadStatus: 'offer/loadStatus',
    LoadOffer: 'offer/loadOffer',
    LoadNearbyOffers: 'offer/loadNearbyOffers',
  },
  Comment: {
    LoadComments: 'comment/loadComments',
    LoadStatus: 'comment/loadStatus',
    SendNewComment: 'comment/sendNewComment',
  },
  User: {
    RequireAuthorization: 'user/requireAuthorization',
    CheckAuth: 'user/checkAuth',
    Login: 'user/login',
    Logout: 'user/logout',
    RedirectToRoute: 'user/redirectToRoute',
  },
  Error: {
    ServerError: 'error/serverError',
    ClearServerError: 'error/clearServerError',
  },
} as const;

const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

const DEFAULT_CITY_NAME = 'Paris';
const BACKEND_URL = 'https://10.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export {
  AppRoute,
  AuthorizationStatus,
  HousingType,
  Setting,
  IconUrl,
  CardType,
  MapType,
  ApiRoute,
  SortType,
  StateAction,
  CITIES,
  DEFAULT_CITY_NAME,
  BACKEND_URL,
  REQUEST_TIMEOUT,
  AUTH_TOKEN_KEY_NAME,
};
