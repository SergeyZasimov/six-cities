import { ClassNamePrefix } from '../../const';
import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type NearPlaceCardProps = {
  offer: Offer;
  onHover?: () => void;
  onLeave?: () => void;
};

function NearPlaceCard(props: NearPlaceCardProps): JSX.Element {

  return (
    <OfferCard classNamePrefix={ClassNamePrefix.NearPlaces} {...props} />
  );
}

export default NearPlaceCard;
