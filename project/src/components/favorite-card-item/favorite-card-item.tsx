import { CardType } from '../../const';
import { Offer } from '../../types/offer';
import OfferList from '../offer-list/offer-list';

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
        <OfferList
          type={CardType.Favorites}
          offers={offers}
        />
      </div>
    </li>
  );
}

export default FavoriteCardItem;

