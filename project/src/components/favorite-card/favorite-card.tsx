import { CardClassNamePrefix } from '../../const';
import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type FavoriteCardProps = {
  offer: Offer;
};

function FavoroteCard(props: FavoriteCardProps): JSX.Element {
  return (
    <OfferCard classNamePrefix={CardClassNamePrefix.Favorites} {...props} />
  );
}

export default FavoroteCard;
