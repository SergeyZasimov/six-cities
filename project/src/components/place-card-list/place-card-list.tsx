import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type CardListProp = {
  offers: Offer[];
  onHoverCard: (id: number | null) => void;
};

function PlaceCardList({ offers, onHoverCard }: CardListProp): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            onHover={() => onHoverCard(offer.id)}
            onLeave={() => onHoverCard(null)}
          />))
      }
    </div>
  );
}

export default PlaceCardList;

