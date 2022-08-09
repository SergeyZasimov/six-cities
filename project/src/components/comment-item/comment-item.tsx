import dayjs from 'dayjs';
import { Comment } from '../../types/comment';
import { getRatingStyle } from '../utils';

type CommentItemProps = {
  comment: Comment;
};

function CommentItem( { comment }: CommentItemProps ): JSX.Element {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src="img/avatar-max.jpg"
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {comment.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={getRatingStyle(comment.rating)}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time
          className="reviews__time"
          dateTime={dayjs(comment.date).toISOString()}
        >
          {dayjs(comment.date).format('MMMM YYYY')}
        </time>
      </div>
    </li>

  );
}

export default CommentItem;
