import { useRef } from 'react';
import { cities } from '../../mock/cities';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';


function CityMap(): JSX.Element {

  const city = cities.amsterdam;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  return (
    <section
      className="cities__map map"
      style={{ height: 'auto' }}
      ref={mapRef}
    >
    </section>
  );
}

export default CityMap;
