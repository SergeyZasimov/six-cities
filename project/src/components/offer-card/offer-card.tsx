import { Link } from 'react-router-dom';
import { AppRoute, CardClassNamePrefix } from '../../const';
import { Offer } from '../../types/offer';
import { getRatingStyle, setFavoriteButtonClassName } from '../utils';

type OfferCardProps = {
  classNamePrefix: string;
  offer: Offer;
  onHover?: () => void;
  onLeave?: () => void;
};

function OfferCard({ classNamePrefix, offer, onHover, onLeave }: OfferCardProps): JSX.Element {

  const setImageSize = () => {
    if (classNamePrefix === CardClassNamePrefix.Favorites) {
      return {
        width: '150',
        height: '110',
      };
    }
    return {
      width: '260',
      height: '200',
    };
  };

  return (
    <article
      className={`${classNamePrefix}__card place-card`}
      onMouseOver={onHover}
      onMouseLeave={onLeave}
    >
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${classNamePrefix}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Room}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.images[0]}
            alt={offer.title}
            style={setImageSize()}
          />
        </Link>
      </div>
      <div className={
        `place-card__info
        ${classNamePrefix === CardClassNamePrefix.Favorites ? 'favorites__card-info' : ''}
        `
      }
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={setFavoriteButtonClassName(offer.isFavorite, 'place-card')}
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
            <span style={getRatingStyle(offer.rating)}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article >
  );
}

export default OfferCard;
