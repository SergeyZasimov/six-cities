import { ComponentType, useState } from 'react';
import CityMap from '../components/city-map/city-map';
import OfferList from '../components/offer-list/offer-list';
import { City } from '../types/city';
import MapHocProps from '../types/map-hoc';
import { Offer } from '../types/offer';


function withMap<T>(Component: ComponentType<T>)
  : ComponentType<Omit<T, keyof MapHocProps>> {

  type ComponentProps = Omit<T, keyof MapHocProps>;

  function WithMap(props: ComponentProps): JSX.Element {

    const [activeCardId, setActiveCardId] = useState<number | null>(null);

    const handleCardHover = (id: number | null): void => {
      setActiveCardId(id);
    };

    return (
      <Component
        {...props as T}
        renderMap={(offers: Offer[], city: City) => (
          <CityMap
            offers={offers}
            activeCardId={activeCardId}
            city={city}
          />
        )}
        renderOfferList={(offers: Offer[]) => (
          <OfferList
            offers={offers}
            onHoverCard={handleCardHover}
          />
        )}
      />
    );
  }

  return WithMap;
}

export default withMap;
