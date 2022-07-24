import { CardType } from '../../const';
import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OfferListProps = {
  type: string;
  offers: Offer[];
  onHoverCard?: (id: number | null) => void;
};

function OfferList({ type, offers, onHoverCard }: OfferListProps) {

  const getlistClassName = () => {
    switch (type) {
      case CardType.Cities:
        return 'cities__places-list places__list tabs__content';
      case CardType.NearPlaces:
        return 'near-places__list places__list';
      case CardType.Favorites:
        return 'favorites__places';
    }
  };

  const getCardComponentByType = (offer: Offer) => {
    switch (type) {
      case CardType.Cities:
      case CardType.NearPlaces:
        return (
          <OfferCard
            key={offer.id}
            cardType={type}
            offer={offer}
            onHoverCard={onHoverCard}
          />
        );
      case CardType.Favorites:
        return (
          <OfferCard
            key={offer.id}
            cardType={type}
            offer={offer}
          />
        );
    }
  };

  return (
    <div className={getlistClassName()}>
      {
        offers.map((offer) => (
          getCardComponentByType(offer)
        ))
      }
    </div>
  );
}

export default OfferList;
