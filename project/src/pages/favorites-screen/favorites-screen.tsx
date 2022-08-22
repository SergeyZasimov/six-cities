import FavoriteCardItem from '../../components/favorite-card-item/favorite-card-item';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks/store';
import { getFavoriteOffers } from '../../store/favotires-process/selectors';
import { Offer } from '../../types/offer';


type GroupOffer = {
  [city: string]: Offer[];
};


function FavoritesScreen(): JSX.Element {

  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const groupFavoriteOffers = (): GroupOffer => {
    const groups: GroupOffer = {};
    favoriteOffers.forEach((offer: Offer) => {
      const city: string = offer.city.name;
      if (city in groups) {
        groups[city].push(offer);
      } else {
        groups[city] = [];
        groups[city].push(offer);
      }
    });
    return groups;
  };

  const groupedFavoriteOffersList = Object.entries(groupFavoriteOffers());


  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list" data-testid="favorites-list">
              {
                groupedFavoriteOffersList.map(([city, group]) => (
                  <FavoriteCardItem key={city} city={city} offers={group} />
                ))
              }
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a
          className="footer__logo-link"
          href="main.html"
        >
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
