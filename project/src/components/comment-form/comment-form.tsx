import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import { MAX_RATING, NewCommentLength, SendingStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { sendNewComment } from '../../store/comments-process/async-actions';
import { getSendingStatus } from '../../store/comments-process/selectors';

type CommentFormProps = {
  roomId: number;
};

const RATING_VALUES = Array.from({ length: MAX_RATING }, (_, index) => MAX_RATING - index);

function CommentForm({ roomId }: CommentFormProps): JSX.Element {

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const dispatch = useAppDispatch();

  const sendingStatus = useAppSelector(getSendingStatus);

  useEffect(() => {
    if (sendingStatus === SendingStatus.Success) {
      setRating(0);
      setComment('');
    }
  }, [sendingStatus]);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    evt.preventDefault();
    setRating(+evt.target.value);
  };

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    evt.preventDefault();
    setComment(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    dispatch(sendNewComment({ roomId, rating: rating, comment: comment }));
  };

  const isNewCommentLengthValid =
    comment.length >= NewCommentLength.Min && comment.length <= NewCommentLength.Max;

  const isSubmitAvailable = rating && isNewCommentLengthValid;

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
          RATING_VALUES.map((ratingValue) => (
            <Fragment key={ratingValue}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={ratingValue}
                id={`${ratingValue}-star`}
                type="radio"
                onChange={handleRatingChange}
                disabled={sendingStatus === SendingStatus.Sending}
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
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleTextChange}
        value={comment}
        maxLength={NewCommentLength.Max}
        disabled={sendingStatus === SendingStatus.Sending}
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
          disabled={!isSubmitAvailable || sendingStatus === SendingStatus.Sending}
        >Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
