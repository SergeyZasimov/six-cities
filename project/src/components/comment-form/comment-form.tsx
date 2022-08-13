import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { MAX_RATING, NewCommentLength } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { sendNewComment } from '../../store/api-actions';
import { getIsDataSending } from '../../store/selectors';

type NewComment = {
  rating: number;
  comment: string;
};

type CommentFormProps = {
  roomId: number;
};

const RATING_VALUES = Array.from({ length: MAX_RATING }, ( _, index ) => MAX_RATING - index);

const INITIAL_NEW_COMMENT = { rating: 0, comment: '' };

function CommentForm( { roomId }: CommentFormProps ): JSX.Element {

  const [newComment, setNewComment] = useState<NewComment>(INITIAL_NEW_COMMENT);
  const dispatch = useAppDispatch();

  const isDataSending = useAppSelector(getIsDataSending);

  const handleRatingChange = ( evt: ChangeEvent<HTMLInputElement> ): void => {
    evt.preventDefault();
    setNewComment({ ...newComment, rating: +evt.target.value });
  };

  const handleTextChange = ( evt: ChangeEvent<HTMLTextAreaElement> ): void => {
    evt.preventDefault();
    setNewComment({ ...newComment, comment: evt.target.value });
  };

  const handleSubmit = ( evt: FormEvent<HTMLFormElement> ): void => {
    evt.preventDefault();
    dispatch(sendNewComment({ roomId, rating: newComment.rating, comment: newComment.comment }));
    setNewComment(INITIAL_NEW_COMMENT);
  };

  const isNewCommentLengthValid =
    newComment.comment.length >= NewCommentLength.Min && newComment.comment.length <= NewCommentLength.Max;

  const isSubmitAvailable = newComment.rating && isNewCommentLengthValid;

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
          RATING_VALUES.map(( ratingValue ) => (
            <Fragment key={ratingValue}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={ratingValue}
                id={`${ratingValue}-star`}
                type="radio"
                onChange={handleRatingChange}
                disabled={isDataSending}
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
                  style={ratingValue <= newComment.rating ? { fill: '#ff9000' } : {}}
                >
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>

          ))
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleTextChange}
        value={newComment.comment}
        maxLength={NewCommentLength.Max}
        disabled={isDataSending}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">{NewCommentLength.Min} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isSubmitAvailable || isDataSending}
        >Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
