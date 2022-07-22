import { City } from '../../types/city';

type LocationItemProps = {
  city: City;
};

function LocationItem({ city }: LocationItemProps) {
  return (
    <li className="locations__item">
      <a
        className="locations__item-link tabs__item"
        href="#todo"
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
}

export default LocationItem;
