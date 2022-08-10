import { useCallback, useState } from 'react';
import Header from '../../components/header/header';
import LocationList from '../../components/location-list/location-list';
import SortForm from '../../components/sort-form/sort-form';
import { getSortOffers } from '../../components/utils';
import { Cities } from '../../types/city';
import MapHocProps from '../../types/map-hoc';
import { useAppSelector } from '../../hooks/store';
import { getLocation, getOffers } from '../../store/selectors';
import { SortType } from '../../const';
import { Offer } from '../../types/offer';

type MainScreenProps = {
  cities: Cities;
};

function MainScreen( { cities, renderMap, renderOfferList }: MainScreenProps & MapHocProps ): JSX.Element {

  const location = useAppSelector(getLocation);
  const offers = useAppSelector(getOffers);

  const locationOffers = offers.filter(( offer: Offer ) => offer.city.name === location);
  const city = locationOffers[0].city;
  const cardsOnPage = locationOffers.length;

  const [sortType, setSortType] = useState<string>(SortType.Popular);

  const handleChangeSortType = useCallback(( type: string ) => {
    setSortType(type);
  }, []);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList
              cities={cities}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cardsOnPage} places to stay in {location}</b>
              <SortForm
                sortType={sortType}
                onChangeSortType={handleChangeSortType}
              />

              {renderOfferList(getSortOffers(sortType, [...locationOffers]))}

            </section>
            <div className="cities__right-section">
              {
                renderMap(
                  locationOffers,
                  city,
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
