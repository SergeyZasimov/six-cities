import { City } from './city';
import { Offer } from './offer';

type MapHocProps = {
  renderMap: (mapType: string, offers: Offer[], city: City) => JSX.Element;
  renderOfferList: (type: string, offers: Offer[]) => JSX.Element;
};

export default MapHocProps;
