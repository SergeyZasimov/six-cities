import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { Icon, Marker } from 'leaflet';
import { IconUrl } from '../../const';
import { Offer } from '../../types/offer';
import { City } from '../../types/city';

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
      className="cities__map map"
      style={{ height: 'auto' }}
      ref={mapRef}
    >
    </section>
  );
}

export default CityMap;
