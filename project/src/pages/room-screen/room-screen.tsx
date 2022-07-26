import { Navigate, useParams } from 'react-router-dom';
import { getRatingStyle, setFavoriteButtonClassName } from '../../components/utils';
import { Offer } from '../../types/offer';
import CommentForm from '../../components/comment-form/comment-form';
import CommentList from '../../components/comment-list/comment-list';
import { AppRoute, Setting } from '../../const';
import MapHocProps from '../../types/map-hoc';
import Header from '../../components/header/header';

type RoomScreenProps = {
  offers: Offer[];
};

function RoomScreen({ offers, renderMap, renderOfferList }: RoomScreenProps & MapHocProps): JSX.Element {

  const { id } = useParams();

  if (!id) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const paramsId = +id;
  const room = offers.find((offer: Offer) => offer.id === paramsId) as Offer;

  if (!room) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const nearOffers = offers.slice(0, Setting.NearPlacesCount);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                room.images.map((img, index) => (
                  <div className="property__image-wrapper" key={img}>
                    <img
                      className="property__image"
                      src={img}
                      alt={`Room ${index.toString()}`}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                room.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {room.title}
                </h1>
                <button
                  className={setFavoriteButtonClassName(room.isFavorite, 'property')}
                  type="button"
                >
                  <svg
                    className="property__bookmark-icon"
                    width="31"
                    height="33"
                  >
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={getRatingStyle(room.rating)}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{room.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {room.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {room.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {room.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{room.price}</b>{' '}
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    room.goods.map((good: string) => (
                      <li key={good} className="property__inside-item">
                        {good}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={room.host.avatarUrl}
                      width="74"
                      height="74"
                      alt={`Host ${room.host.name}`}
                    />
                  </div>
                  <span className="property__user-name">
                    {room.host.name}
                  </span>
                  <span className="property__user-status">
                    {room.host.isPro}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {room.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">reviews &middot; <span className="reviews__amount">{room.comments.length}</span></h2>
                <CommentList comments={room.comments} />
                <CommentForm />
              </section>
            </div>
          </div>
        </section>
        <div className="container">
          {
            renderMap(
              nearOffers,
              room.city
            )
          }

          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            {
              renderOfferList(nearOffers)
            }
          </section>
        </div>
      </main>
    </div>

  );
}

export default RoomScreen;
