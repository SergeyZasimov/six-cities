import Header from '../../components/header/header';
import LocationList from '../../components/location-list/location-list';
import { DEFAULT_CITIES } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { getLocation } from '../../store/location-process/selectors';

function MainEmptyScreen(): JSX.Element {

  const currentLocation = useAppSelector(getLocation);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList cities={DEFAULT_CITIES} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in {currentLocation}</p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainEmptyScreen;
