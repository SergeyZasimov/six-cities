import { ChangeEvent, Fragment } from 'react';
import { MAX_RATING, SendingStatus } from '../../const';

type RatingStarsProps = {
  rating: number,
  onRatingChange: ( evt: ChangeEvent<HTMLInputElement> ) => void,
  sendingStatus: SendingStatus,
}

const RATING_VALUES = Array.from({ length: MAX_RATING }, ( _, index ) => MAX_RATING - index);


function RatingStars( { rating, onRatingChange, sendingStatus }: RatingStarsProps ): JSX.Element {
  return (
    <>
      {
        RATING_VALUES.map(( ratingValue ) => (
          <Fragment key={ratingValue}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={ratingValue}
              id={`${ratingValue}-star`}
              type="radio"
              onChange={onRatingChange}
              disabled={sendingStatus === SendingStatus.Sending}
              data-testid={`rating-star-${ratingValue}`}
            />
            <label
              htmlFor={`${ratingValue}-star`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg
                className="form__star-image"
                width="37"
                height="33"
                style={ratingValue <= rating ? { fill: '#ff9000' } : {}}
              >
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))
      }
    </>
  );
}

export default RatingStars;
