import FavoriteCardItem from '../../components/favorite-card-item/favorite-card-item';
import { Offer } from '../../types/offer';

type FavoritesScreenProps = {
  offers: Offer[];
};

type GroupOffer = {
  [city: string]: Offer[];
};


function FavoritesScreen({ offers }: FavoritesScreenProps): JSX.Element {

  const favoriteOffers: Offer[] = offers.filter((offer: Offer) => offer.isFavorite);

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

  const groupedFavorireOffersList = Object.entries(groupFavoriteOffers());


  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a
                className="header__logo-link"
                href="main.html"
              >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#todo"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a
                    className="header__nav-link"
                    href="#todo"
                  >
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                groupedFavorireOffersList.map(([city, group]) => (
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
