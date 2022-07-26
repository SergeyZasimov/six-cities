import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { changeLocation } from '../../store/actions';
import { City } from '../../types/city';
import LocationItem from '../location-item/location-item';

type LocationListProps = {
  cities: City[];
};

function LocationList({ cities }: LocationListProps) {

  const selectedLocation = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  const handleSelectLocation = (name: string) => {
    dispatch(changeLocation({ location: name }));
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <LocationItem
          key={city.name}
          city={city}
          selectedLocation={selectedLocation}
          onSelectLocation={handleSelectLocation}
        />
      ))}
    </ul>

  );
}

export default LocationList;
