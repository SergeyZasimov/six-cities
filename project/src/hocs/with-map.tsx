import { ComponentType, useState } from 'react';
import CityMap from '../components/city-map/city-map';
import PlaceCardList from '../components/place-card-list/place-card-list';
import { City } from '../types/city';
import { Offer } from '../types/offer';

type HOCProps = {
  renderMap: (classNamePrefix: string, offers: Offer[], city: City) => void;
  renderOfferList: (offers: Offer[]) => void;
};

function withMap<T>(Component: ComponentType<T>)
  : ComponentType<Omit<T, keyof HOCProps>> {

  type ComponentProps = Omit<T, keyof HOCProps>;

  function WithMap(props: ComponentProps): JSX.Element {
    const [activeCardId, setActiveCardId] = useState<number | null>(null);

    const handleCardHover = (id: number | null): void => {
      setActiveCardId(id);
    };

    return (
      <Component
        {...props as T}
        renderMap={(classNamePrefix: string, offers: Offer[], city: City) => (
          <CityMap
            classNamePrefix={classNamePrefix}
            offers={offers}
            activeCardId={activeCardId}
            city={city}
          />
        )}
        renderOfferList={(offers: Offer[]) => (
          <PlaceCardList
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
