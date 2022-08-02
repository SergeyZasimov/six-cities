
type LocationItemProps = {
  city: string;
  selectedLocation: string;
  onSelectLocation: (name: string) => void;
};

function LocationItem({ city, selectedLocation, onSelectLocation }: LocationItemProps): JSX.Element {

  const isSelected = selectedLocation === city;

  return (
    <li className="locations__item" onClick={() => onSelectLocation(city)}>
      <a
        className={`locations__item-link tabs__item ${isSelected && 'tabs__item--active'}`}
        href={`#${city}`}
      >
        <span>{city}</span>
      </a>
    </li>
  );
}

export default LocationItem;
