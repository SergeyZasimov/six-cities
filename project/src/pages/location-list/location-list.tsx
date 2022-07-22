import { City } from '../../types/city';
import LocationItem from '../location-item/location-item';

type LocationListProps = {
  cities: City[];
};

function LocationList({ cities }: LocationListProps) {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <LocationItem key={city.name} city={city} />
      ))}
    </ul>

  );
}

export default LocationList;
