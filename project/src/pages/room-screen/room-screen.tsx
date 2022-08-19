import { getRatingStyle } from '../../components/utils';
import CommentForm from '../../components/comment-form/comment-form';
import CommentList from '../../components/comment-list/comment-list';
import { AppRoute, AuthorizationStatus, FavoriteButtonScreen, LoadingStatus, MAX_GALLERY_LENGTH } from '../../const';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import LoadingScreen from '../loading-screen/loading-screen';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import CityMap from '../../components/city-map/city-map';
import OfferList from '../../components/offer-list/offer-list';
import { getRoom, getRoomLoadingStatus } from '../../store/room-process/selectors';
import { Offer } from '../../types/offer';
import { fetchRoomAction } from '../../store/room-process/async-actions';
import { fetchNearbyOffers } from '../../store/nearby-offers-process/async-actions';
import { getNearbyOffers } from '../../store/nearby-offers-process/selectors';
import { getCommentsList } from '../../store/comments-process/selectors';
import { fetchComments } from '../../store/comments-process/async-actions';
import { resetLoadingStatus } from '../../store/room-process/room-process';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function RoomScreen(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const roomLoadingStatus = useAppSelector(getRoomLoadingStatus);
  const room = useAppSelector(getRoom) as Offer;
  const commentsList = useAppSelector(getCommentsList);
  const nearbyOffers = useAppSelector(getNearbyOffers);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchRoomAction(id as string));
    dispatch(fetchNearbyOffers(id as string));
    dispatch(fetchComments(id as string));
  }, [dispatch, id]);

  const isCommentFormAvailable = authorizationStatus === AuthorizationStatus.Auth;

  if (roomLoadingStatus === LoadingStatus.Failed) {
    navigate(AppRoute.NotFound);
    dispatch(resetLoadingStatus());
  }

  if (roomLoadingStatus === LoadingStatus.Loading || Object.keys(room).length === 0) {
    return <LoadingScreen />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                room.images.slice(0, MAX_GALLERY_LENGTH).map((img, index) => (
                  <div
                    className="property__image-wrapper"
                    key={img}
                  >
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
                <FavoriteButton isFavorite={room.isFavorite} screen={FavoriteButtonScreen.Property} id={room.id} />
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
                      <li
                        key={good}
                        className="property__inside-item"
                      >
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
                    {room.host.isPro && 'Pro'}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {room.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">

                <CommentList comments={commentsList} />
                {
                  isCommentFormAvailable && <CommentForm roomId={room.id} />
                }
              </section>
            </div>
          </div>
        </section>
        <div className="container">

          <CityMap offers={[...nearbyOffers, room]} activeCardId={room.id} />

          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>

            <OfferList offers={nearbyOffers} />

          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomScreen;
