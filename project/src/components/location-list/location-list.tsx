import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { changeLocation } from '../../store/actions';
import LocationItem from '../location-item/location-item';

type LocationListProps = {
  cities: string[];
};

function LocationList({ cities }: LocationListProps): JSX.Element {

  const selectedLocation = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  const handleSelectLocation = (name: string) => {
    dispatch(changeLocation({ location: name }));
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <LocationItem
          key={city}
          city={city}
          selectedLocation={selectedLocation}
          onSelectLocation={handleSelectLocation}
        />
      ))}
    </ul>

  );
}

export default LocationList;
