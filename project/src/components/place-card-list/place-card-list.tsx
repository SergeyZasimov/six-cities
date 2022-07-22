import { useState } from 'react';
import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type CardListProp = {
  offers: Offer[];
  activeCardId: number | null;
  onHoverCard: (id: number) => void;
};

function PlaceCardList({ offers, activeCardId, onHoverCard }: CardListProp): JSX.Element {

  const isActive = (id: number): boolean => activeCardId === id;

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            isActive={isActive(offer.id)}
            onHover={() => onHoverCard(offer.id)}
          />))
      }
    </div>
  );
}

export default PlaceCardList;

