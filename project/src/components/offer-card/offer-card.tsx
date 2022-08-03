import { Link } from 'react-router-dom';
import { AppRoute, CardType } from '../../const';
import { useAppDispatch } from '../../hooks/store';
import { Offer } from '../../types/offer';
import { getRatingStyle, setFavoriteButtonClassName } from '../utils';
import { fetchCommentsAction, fetchNearbyOffers, fetchOneOfferAction } from '../../store/api-actions';
import { setLoadOffersStatus } from '../../store/actions';

type OfferCardProps = {
  cardType: string;
  offer: Offer;
  onHoverCard?: (id: number | null) => void;
};

const setImageSize = (cardType: string) => {
  if (cardType === CardType.Favorites) {
    return {
      width: 150,
      height: 110,
    };
  }
  return {
    width: 260,
    height: 200,
  };
};


function OfferCard({ cardType, offer, onHoverCard }: OfferCardProps): JSX.Element {

  const imageSize = setImageSize(cardType);
  const dispatch = useAppDispatch();

  const handleMouseOver = () => {
    if (onHoverCard !== undefined) {
      return onHoverCard(offer.id);
    }
  };

  const handleMouseLeave = () => {
    if (onHoverCard !== undefined) {
      return onHoverCard(null);
    }
  };

  const handleLinkClick = () => {
    dispatch(setLoadOffersStatus(true));
    dispatch(fetchOneOfferAction(offer.id));
    dispatch(fetchCommentsAction(offer.id));
    dispatch(fetchNearbyOffers(offer.id));
    dispatch(setLoadOffersStatus(false));
  };

  return (
    <article
      className={`${cardType}__card place-card`}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Room}/${offer.id}`} onClick={handleLinkClick}>
          <img
            className="place-card__image"
            src={offer.images[0]}
            alt={offer.title}
            style={imageSize}
          />
        </Link>
      </div>
      <div className={
        `place-card__info
        ${cardType === CardType.Favorites ? 'favorites__card-info' : ''}
        `
      }
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>{' '}
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
