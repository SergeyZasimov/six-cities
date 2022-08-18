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
  Favorite = '/favorite',
}

enum DomainNameSpace {
  User = 'User',
  Data = 'Data',
  Location = 'Location',
  Favorites = 'Favorites',
  Offers = 'Offers',
  Room = 'Room',
  NearbyOffers = 'NearbyOffers',
  Comments = 'Comments',
}

enum LoadingStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
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
  Offers: {
    LoadOffers: 'offers/loadOffers',
  },
  Room: {
    LoadRoom: 'room/loadRoom',
  },
  NearbyOffers: {
    LoadNearbyOffers: 'nearbyOffers/loadNearbyOffers',
  },
  Comments: {
    SendNewComment: 'comments/sendNewComment',
    LoadComments: 'comments/loadComments',
  },
  Favorites: {
    LoadFavorites: 'favorites/loadFavorites',
    ToggleFavorite: 'favorites/toggleFavorite',
  },
  User: {
    CheckAuth: 'user/checkAuth',
    Login: 'user/login',
    Logout: 'user/logout',
    RedirectToRoute: 'user/redirectToRoute',
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

enum SendingStatus {
  Idle = 'IDLE',
  Sending = 'SENDING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

enum NewCommentLength {
  Max = 300,
  Min = 50,
}

enum FavoriteButtonScreen {
  PlaceCard = 'place-card',
  Property = 'property',
}

const DEFAULT_CITY_NAME = 'Paris';
const BACKEND_URL = 'https://10.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
const MAX_RATING = 5;
const MAX_GALLERY_LENGTH = 6;
const MAX_COMMENTS = 10;

export {
  AppRoute,
  AuthorizationStatus,
  IconUrl,
  CardType,
  MapType,
  ApiRoute,
  DomainNameSpace,
  NewCommentLength,
  FavoriteButtonScreen,
  SendingStatus,
  LoadingStatus,
  SortType,
  StateAction,
  DEFAULT_CITIES,
  DEFAULT_CITY_NAME,
  BACKEND_URL,
  REQUEST_TIMEOUT,
  AUTH_TOKEN_KEY_NAME,
  MAX_RATING,
  MAX_GALLERY_LENGTH,
  MAX_COMMENTS,
};
