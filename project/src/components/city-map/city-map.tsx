import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { Icon, LayerGroup, Marker } from 'leaflet';
import { IconUrl, MapType } from '../../const';
import { Offer } from '../../types/offer';
import { useLocation } from 'react-router-dom';
import { getMapType } from '../utils';
import { useAppSelector } from '../../hooks/store';
import { getCity } from '../../store/offers-process/selectors';

type MapProps = {
  offers: Offer[];
  activeCardId: number | null;
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

function CityMap({ offers, activeCardId }: MapProps): JSX.Element {

  const city = useAppSelector(getCity);
  const { latitude, longitude, zoom } = city.location;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const { pathname } = useLocation();
  const mapType = getMapType(pathname);

  useEffect(() => {
    if (map) {
      map.setView({ lat: latitude, lng: longitude }, zoom, { animate: true });
      const markerGroup = new LayerGroup();
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
          .addTo(markerGroup);
      });
      markerGroup.addTo(map);
      return () => {
        map.removeLayer(markerGroup);
      };
    }
  }, [map, offers, activeCardId, latitude, longitude, zoom]);

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
