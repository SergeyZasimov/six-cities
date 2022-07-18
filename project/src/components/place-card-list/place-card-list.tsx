import { useState } from 'react';
import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type CardListProp = {
  offers: Offer[];
};

function PlaceCardList({ offers }: CardListProp): JSX.Element {

  const [activeCardID, setActiveCardID] = useState<number>();

  const isActive = (id: number): boolean => activeCardID === id;

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            isActive={isActive(offer.id)}
            onHover={() => setActiveCardID(offer.id)}
          />))
      }
    </div>
  );
}

export default PlaceCardList;

