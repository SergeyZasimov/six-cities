import { useState } from 'react';
import Header from '../../components/header/header';
import LocationList from '../../components/location-list/location-list';
import { DEFAULT_CITY_NAME } from '../../const';
import { City } from '../../types/city';
import MapHocProps from '../../types/map-hoc';
import { Offer } from '../../types/offer';

type MainScreenProps = {
  cardsOnPage: number;
  offers: Offer[];
  cities: City[];
};

function MainScreen({ cardsOnPage, offers, cities, renderMap, renderOfferList }: MainScreenProps & MapHocProps): JSX.Element {

  const [selectedCityName, setSelectedCityName] = useState<string>(DEFAULT_CITY_NAME);

  const findLocation = (name: string): City => cities.find((location) => location.name === name) as City;

  const handleLocationSelect = (name: string): void => {
    setSelectedCityName(name);
  };

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList
              cities={cities}
              selectedLocation={selectedCityName}
              onSelectLocation={handleLocationSelect}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cardsOnPage} places to stay in Amsterdam</b>
              <form
                className="places__sorting"
                action="#"
                method="get"
              >
                <span className="places__sorting-caption">Sort by</span>{' '}
                <span
                  className="places__sorting-type"
                  tabIndex={0}
                >
                  Popular
                  <svg
                    className="places__sorting-arrow"
                    width="7"
                    height="4"
                  >
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >Popular
                  </li>
                  <li
                    className="places__option"
                    tabIndex={0}
                  >Price: low to high
                  </li>
                  <li
                    className="places__option"
                    tabIndex={0}
                  >Price: high to low
                  </li>
                  <li
                    className="places__option"
                    tabIndex={0}
                  >Top rated first
                  </li>
                </ul>
              </form>

              {renderOfferList(offers)}

            </section>
            <div className="cities__right-section">
              {
                renderMap(
                  offers,
                  findLocation(selectedCityName),
                )
              }
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}

export default MainScreen;
