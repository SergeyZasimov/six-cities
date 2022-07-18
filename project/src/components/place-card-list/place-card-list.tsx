import { useState } from 'react';
import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type CardListProp = {
  offers: Offer[];
};

function PlaceCardList({ offers }: CardListProp): JSX.Element {

  const [activeCardId, setActiveCardId] = useState<number>();

  const isActive = (id: number): boolean => activeCardId === id;

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            isActive={isActive(offer.id)}
            onHover={() => setActiveCardId(offer.id)}
          />))
      }
    </div>
  );
}

export default PlaceCardList;

