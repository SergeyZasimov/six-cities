import { Offer } from './offer';

type MapHocProps = {
  renderMap: (offers: Offer[]) => JSX.Element;
  renderOfferList: (offers: Offer[]) => JSX.Element;
};

export default MapHocProps;
