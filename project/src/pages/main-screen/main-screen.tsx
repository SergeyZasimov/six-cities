import { useCallback, useState } from 'react';
import Header from '../../components/header/header';
import LocationList from '../../components/location-list/location-list';
import SortForm from '../../components/sort-form/sort-form';
import { getSortOffers } from '../../components/utils';
import { Cities } from '../../types/city';
import { useAppSelector } from '../../hooks/store';
import { LoadingStatus, SortType } from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';
import OfferList from '../../components/offer-list/offer-list';
import CityMap from '../../components/city-map/city-map';
import { getLocationOffers, getOffersLoadingStatus } from '../../store/offers-process/selectors';
import MainEmptyScreen from '../main-empty-screen/main-empty-screen';
import { toast } from 'react-toastify';
import { getLocation } from '../../store/location-process/selectors';

type MainScreenProps = {
  cities: Cities;
};

function MainScreen({ cities }: MainScreenProps): JSX.Element {

  const location = useAppSelector(getLocation);
  const locationOffers = useAppSelector(getLocationOffers);
  const offersLoadingStatus = useAppSelector(getOffersLoadingStatus);
  const cardsOnPage = locationOffers.length;

  const [sortType, setSortType] = useState<string>(SortType.Popular);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const handleChangeSortType = useCallback((type: string) => {
    setSortType(type);
  }, []);


  const handleCardHover = (id: number | null): void => {
    setActiveCardId(id);
  };

  if (offersLoadingStatus === LoadingStatus.Loading) {
    return <LoadingScreen />;
  }

  if (offersLoadingStatus === LoadingStatus.Failed) {
    toast.error('Offers didn\'t load');
    return <MainEmptyScreen />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList />
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

              <OfferList
                offers={(getSortOffers(sortType, [...locationOffers]))}
                onHoverCard={handleCardHover}
              />

            </section>
            <div className="cities__right-section">
              <CityMap offers={locationOffers} activeCardId={activeCardId} />
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}

export default MainScreen;
