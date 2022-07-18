import { Offer } from '../../types/offer';
import { getRating, setFavoriteButtonClassName } from '../utils';

type FavoriteCardProps = {
  offer: Offer;
};

function FavoroteCard({ offer }: FavoriteCardProps): JSX.Element {
  return (
    <article className="favorites__card place-card">
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#todo">
          <img
            className="place-card__image"
            src={offer.images[0]}
            width="150"
            height="110"
            alt={offer.title}
          />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={setFavoriteButtonClassName(offer)}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width="18"
              height="19"
            >
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={getRating(offer.rating)}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#todo">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default FavoroteCard;
