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
    SetUserName: 'user/setUserName',
  },
  Error: {
    ServerError: 'error/serverError',
    ClearServerError: 'error/clearServerError',
  },
} as const;

const DEFAULT_CITIES = [
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
const MAX_RATING = 5;
const MAX_COMMENT_LENGTH = 50;


export {
  AppRoute,
  AuthorizationStatus,
  IconUrl,
  CardType,
  MapType,
  ApiRoute,
  SortType,
  StateAction,
  DEFAULT_CITIES,
  DEFAULT_CITY_NAME,
  BACKEND_URL,
  REQUEST_TIMEOUT,
  AUTH_TOKEN_KEY_NAME,
  MAX_RATING,
  MAX_COMMENT_LENGTH,
};
