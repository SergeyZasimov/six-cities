import { CardClassNamePrefix } from '../../const';
import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type PlaceCardProps = {
  offer: Offer;
  onHover: () => void;
  onLeave: () => void;
};

function PlaceCard(props: PlaceCardProps): JSX.Element {

  return (
    <OfferCard classNamePrefix={CardClassNamePrefix.Cities} {...props} />
  );
}

export default PlaceCard;
