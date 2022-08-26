import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { NewCommentLength, SendingStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { sendNewComment } from '../../store/comments-process/async-actions';
import { getSendingStatus } from '../../store/comments-process/selectors';
import RatingStars from '../rating-stars/rating-stars';

type CommentFormProps = {
  roomId: number;
};


function CommentForm( { roomId }: CommentFormProps ): JSX.Element {

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

  const handleRatingChange = ( evt: ChangeEvent<HTMLInputElement> ): void => {
    evt.preventDefault();
    setRating(+evt.target.value);
  };

  const handleTextChange = ( evt: ChangeEvent<HTMLTextAreaElement> ): void => {
    evt.preventDefault();
    setComment(evt.target.value);
  };

  const handleSubmit = ( evt: FormEvent<HTMLFormElement> ): void => {
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
        <RatingStars
          rating={rating}
          onRatingChange={handleRatingChange}
          sendingStatus={sendingStatus}
        />
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
        data-testid="comment-text"
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
          data-testid="comment-submit-button"
        >Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
