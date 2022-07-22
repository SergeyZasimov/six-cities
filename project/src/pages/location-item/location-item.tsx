import { City } from '../../types/city';

type LocationItemProps = {
  city: City;
  selectedLocation: string;
  onSelectLocation: (name: string) => void;
};

function LocationItem({ city, selectedLocation, onSelectLocation }: LocationItemProps) {

  const isSelected = selectedLocation === city.name;

  return (
    <li className="locations__item" onClick={() => onSelectLocation(city.name)}>
      <a
        className={`locations__item-link tabs__item ${isSelected && 'tabs__item--active'}`}
        href="#todo"
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
}

export default LocationItem;
