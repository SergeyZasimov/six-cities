import { useLocation } from 'react-router-dom';
import { CardType } from '../../const';
import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import { getCardType } from '../utils';

type OfferListProps = {
  offers: Offer[];
  onHoverCard?: (id: number | null) => void;
};

const getlistClassName = (type: string) => {
  switch (type) {
    case CardType.Cities:
      return 'cities__places-list places__list tabs__content';
    case CardType.NearPlaces:
      return 'near-places__list places__list';
    case CardType.Favorites:
      return 'favorites__places';
  }
};

function OfferList({ offers, onHoverCard }: OfferListProps) {

  const { pathname } = useLocation();
  const type = getCardType(pathname);
  const listClassName = getlistClassName(type);

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
    <div className={listClassName}>
      {
        offers.map(getCardComponentByType)
      }
    </div>
  );
}

export default OfferList;
