import { useState } from 'react';
import { SortType } from '../../const';

type SortFormProps = {
  onChangeSortType: (sortType: string) => void;
};

function SortForm({ onChangeSortType }: SortFormProps): JSX.Element {

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [activeSortType, setActiveSortType] = useState<string>(SortType.Popular);

  const handleSelectSortType = (type: string): void => {
    setActiveSortType(type);
    setIsOpened(false);
    onChangeSortType(type);
  };

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
    >
      <span className="places__sorting-caption">Sort by</span>{' '}
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened(!isOpened)}
      >
        {activeSortType}
        <svg
          className="places__sorting-arrow"
          width="7"
          height="4"
        >
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened && 'places__options--opened'}`}>
        {
          Object.values(SortType).map((type) => (
            <li
              key={type}
              className={`places__option ${activeSortType === type ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => handleSelectSortType(type)}
            >{type}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default SortForm;
