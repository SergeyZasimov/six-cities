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
  CardsOnPage = 5,
  MaxRating = 5,
}

enum IconUrl {
  Default = './img/pin.svg',
  Active = './img/pin-active.svg',
}

const DefaultCityName = 'Amsterdam';

export { AppRoute, AuthorizationStatus, HousingType, Setting, IconUrl, DefaultCityName };
