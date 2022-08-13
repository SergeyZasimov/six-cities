import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { Cities } from '../../types/city';
import LocationItem from '../location-item/location-item';
import { memo } from 'react';
import { getLocation } from '../../store/selectors';
import { changeLocation } from '../../store/location-process/location-process';

type LocationListProps = {
  cities: Cities;
};

function LocationList( { cities }: LocationListProps ): JSX.Element {

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
