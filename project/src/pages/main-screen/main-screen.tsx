import { useState } from 'react';
import Header from '../../components/header/header';
import LocationList from '../../components/location-list/location-list';
import SortForm from '../../components/sort-form/sort-form';
import { SortType } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { City } from '../../types/city';
import MapHocProps from '../../types/map-hoc';
import { Offer } from '../../types/offer';

type MainScreenProps = {
  cities: City[];
};

function MainScreen({ cities, renderMap, renderOfferList }: MainScreenProps & MapHocProps): JSX.Element {

  const currentLocation = useAppSelector((state) => state.location);
  const offers = useAppSelector((state) => state.offers);
  const cardsOnPage = offers.length;

  const [sortOffers, setSortOffers] = useState(offers);

  const handleChangeSortType = (sortType: string) => {
    switch (sortType) {
      case SortType.PriceHighToLow:
        setSortOffers([...offers].sort((offerA: Offer, offerB: Offer) => offerB.price - offerA.price));
        break;
      case SortType.PriceLowToHigh:
        setSortOffers([...offers].sort((offerA: Offer, offerB: Offer) => -(offerB.price - offerA.price)));
        break;
      case SortType.TopRatedFirst:
        setSortOffers([...offers].sort((offerA: Offer, offerB: Offer) => offerB.rating - offerA.rating));
        break;
      default:
        setSortOffers([...offers]);
    }
  };

  const findLocation = (name: string): City => cities.find((location) => location.name === name) as City;

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
              <b className="places__found">{cardsOnPage} places to stay in {currentLocation}</b>
              <SortForm onChangeSortType={handleChangeSortType} />

              {renderOfferList(sortOffers)}

            </section>
            <div className="cities__right-section">
              {
                renderMap(
                  sortOffers,
                  findLocation(currentLocation),
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
