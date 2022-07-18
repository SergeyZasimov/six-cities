import { Offer } from '../../types/offer';
import FavoriteCard from '../favorite-card/favorite-card';

type FavoriteCardItemProps = {
  city: string;
  offers: Offer[];
};

function FavoriteCardItem({ city, offers }: FavoriteCardItemProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a
            className="locations__item-link"
            href="#todo"
          >
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <FavoriteCard key={offer.id} offer={offer} />
        ))}
      </div>
    </li>
  );
}

export default FavoriteCardItem;

