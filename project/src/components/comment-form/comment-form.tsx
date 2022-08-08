import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { MAX_COMMENT_LENGTH, MAX_RATING } from '../../const';
import { useAppDispatch } from '../../hooks/store';
import { sendNewComment } from '../../store/api-actions';

type NewComment = {
  rating: number;
  comment: string;
};

type CommentFormProps = {
  roomId: number;
};

const createStarRating = ( handleChangeRating: ( evt: ChangeEvent<HTMLInputElement> ) => void, rating: number ) => (
  Array.from({ length: MAX_RATING }, (( _, index ) => {
    const starQuantity: number = MAX_RATING - index;
    return (
      <Fragment key={starQuantity}>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={starQuantity}
          id={`${starQuantity}-star`}
          type="radio"
          onChange={handleChangeRating}
        />
        <label
          htmlFor={`${starQuantity}-star`}
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg
            className="form__star-image"
            width="37"
            height="33"
            style={starQuantity <= rating ? { fill: '#ff9000' } : {}}
          >
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </Fragment>
    );
  }))
);

function CommentForm( { roomId }: CommentFormProps ): JSX.Element {

  const [newComment, setNewComment] = useState({ rating: 0, comment: '' } as NewComment);
  const dispatch = useAppDispatch();

  const handleChangeRating = ( evt: ChangeEvent<HTMLInputElement> ): void => {
    evt.preventDefault();
    setNewComment({ ...newComment, rating: +evt.target.value });
  };

  const handleChangeText = ( evt: ChangeEvent<HTMLTextAreaElement> ): void => {
    evt.preventDefault();
    setNewComment({ ...newComment, comment: evt.target.value });
  };

  const handleSubmit = ( evt: FormEvent<HTMLFormElement> ): void => {
    evt.preventDefault();
    dispatch(sendNewComment({ roomId, rating: newComment.rating, comment: newComment.comment }));
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label
        className="reviews__label form__label"
        htmlFor="review"
      >Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {
          createStarRating(handleChangeRating, newComment.rating)
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChangeText}
        maxLength={MAX_COMMENT_LENGTH}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">{MAX_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
        >Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
