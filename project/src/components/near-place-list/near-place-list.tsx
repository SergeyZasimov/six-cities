import { Offer } from '../../types/offer';
import NearPlaceCard from '../near-place-card/near-place-card';

type NearPlaceListProps = {
  offers: Offer[];
  onHoverCard: (id: number | null) => void;
};

function NearPlaceList({ offers, onHoverCard }: NearPlaceListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {
        offers.map((offer) => (
          <NearPlaceCard
            key={offer.id}
            offer={offer}
            onHover={() => onHoverCard(offer.id)}
            onLeave={() => onHoverCard(null)}
          />
        ))
      }
    </div>
  );
}

export default NearPlaceList;
