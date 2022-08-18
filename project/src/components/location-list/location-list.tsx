import { useAppDispatch, useAppSelector } from '../../hooks/store';
import LocationItem from '../location-item/location-item';
import { memo } from 'react';
import { changeLocation } from '../../store/location-process/location-process';
import { DEFAULT_CITIES } from '../../const';
import { getLocation } from '../../store/location-process/selectors';


function LocationList(): JSX.Element {

  const cities = DEFAULT_CITIES;
  const currentLocation = useAppSelector(getLocation);
  const dispatch = useAppDispatch();

  const handleSelectLocation = ( name: string ) => {
    dispatch(changeLocation(name));
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map(( city ) => (
        <LocationItem
          key={city}
          city={city}
          selectedLocation={currentLocation}
          onSelectLocation={handleSelectLocation}
        />
      ))}
    </ul>

  );
}

export default memo(LocationList);
