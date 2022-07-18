import { Setting } from '../../const';
import { Offer } from '../../types/offer';

type PlaceCardProps = {
  offer: Offer;
  isActive: boolean;
  onHover: () => void;
};

function PlaceCard({ offer, isActive, onHover }: PlaceCardProps): JSX.Element {

  const getRating = (rating: number, maxRating: number): { width: string; } => {
    const width = ((rating / maxRating) * 100).toString();
    return { width: `${width}%` };
  };

  const setFavoriteButtonClassName = (): string => (
    offer.isFavorite
      ? 'place-card__bookmark-button place-card__bookmark-button--active button'
      : 'place-card__bookmark-button button'
  );

  return (
    <article className="cities__card place-card" onMouseOver={onHover}>
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="/">
          <img
            className="place-card__image"
            src={offer.images[0]}
            width="260"
            height="200"
            alt={offer.title}
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.nightPrice}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={setFavoriteButtonClassName()}
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
            <span style={getRating(offer.rating, Setting.MAX_RATING)}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="/">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article >
  );
}

export default PlaceCard;
