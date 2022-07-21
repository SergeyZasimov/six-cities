import { useEffect, useRef } from 'react';
import { cities } from '../../mock/cities';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { offers } from '../../mock/offers';
import { Icon, Marker } from 'leaflet';
import { IconUrl } from '../../const';


const defaultIcon = new Icon({
  iconUrl: IconUrl.Default,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function CityMap(): JSX.Element {

  const city = cities.amsterdam;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(defaultIcon)
          .addTo(map);
      });
    }
  }, [map, offers]);

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
