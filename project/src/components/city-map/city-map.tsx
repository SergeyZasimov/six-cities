import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { Icon, Marker } from 'leaflet';
import { IconUrl, MapType } from '../../const';
import { Offer } from '../../types/offer';
import { City } from '../../types/city';
import { useLocation } from 'react-router-dom';
import { getMapType } from '../utils';

type MapProps = {
  offers: Offer[];
  activeCardId: number | null;
  city: City;
};

const DEFAULT_ICON = new Icon({
  iconUrl: IconUrl.Default,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const ACTIVE_ICON = new Icon({
  iconUrl: IconUrl.Active,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function CityMap({ offers, activeCardId, city }: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const { pathname } = useLocation();
  const mapType = getMapType(pathname);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            offer.id === activeCardId
              ? ACTIVE_ICON
              : DEFAULT_ICON
          )
          .addTo(map);
      });
    }
  }, [map, offers, activeCardId]);

  return (
    <section
      className={`${mapType}__map map`}
      style={mapType === MapType.Property ? { height: '579px' } : { height: 'auto' }}
      ref={mapRef}
    >
    </section>
  );
}

export default CityMap;
