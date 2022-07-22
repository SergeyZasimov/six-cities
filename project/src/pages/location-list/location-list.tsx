import { City } from '../../types/city';
import LocationItem from '../location-item/location-item';

type LocationListProps = {
  cities: City[];
  selectedLocation: string;
  onSelectLocation: (name: string) => void;
};

function LocationList({ cities, selectedLocation, onSelectLocation }: LocationListProps) {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <LocationItem
          key={city.name}
          city={city}
          selectedLocation={selectedLocation}
          onSelectLocation={onSelectLocation}
        />
      ))}
    </ul>

  );
}

export default LocationList;
