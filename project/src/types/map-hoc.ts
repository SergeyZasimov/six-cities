import { City } from './city';
import { Offer } from './offer';

type MapHocProps = {
  renderMap: (offers: Offer[], city: City) => JSX.Element;
  renderOfferList: (offers: Offer[]) => JSX.Element;
};

export default MapHocProps;
