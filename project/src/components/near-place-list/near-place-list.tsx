import { Offer } from '../../types/offer';
import NearPlaceCard from '../near-place-card/near-place-card';

type NearPlaceListProps = {
  offers: Offer[];
}

function NearPlaceList({offers}: NearPlaceListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {
        offers.map((offer) => (
          <NearPlaceCard key={offer.id} offer={offer} />
        ))
      }
    </div>
  );
}

export default NearPlaceList;
