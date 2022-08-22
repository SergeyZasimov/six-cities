import { State } from '../../types/state';

export const getOffersLoadingStatus = (state: State) => state.Offers.status;

export const getLocationOffers = (state: State) => {
  const currentLocation = state.Location.currentLocation;
  return state.Offers.offers.filter(
    (offer) =>
      offer.city.name === currentLocation,
  );
};

export const getCity = (state: State) => getLocationOffers(state)[0].city;
