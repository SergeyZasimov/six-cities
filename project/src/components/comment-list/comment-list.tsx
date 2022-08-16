import { Comment } from '../../types/comment';
import CommentItem from '../comment-item/comment-item';
import { memo } from 'react';
import { MAX_COMMENTS } from '../../const';
import dayjs from 'dayjs';

type CommentListProps = {
  comments: Comment[];
};

const getCommentsLength = ( comments: Comment[] ): number => (
  comments.length > MAX_COMMENTS
    ? MAX_COMMENTS
    : comments.length
);

const dateSorting = ( commentA: Comment, commentB: Comment ) => {
  const timeA = dayjs(commentA.date);
  const timeB = dayjs(commentB.date);
  return timeB.diff(timeA);
};

const prepareComments = ( comments: Comment[] ): Comment[] => (
  [...comments]
    .sort(dateSorting)
    .slice(0, getCommentsLength(comments))
);

function CommentList( { comments }: CommentListProps ): JSX.Element {

  return (
    <>
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">{getCommentsLength(comments)}</span>
      </h2>
      <ul className="reviews__list">
        {
          prepareComments(comments).map(( comment ) => (
            <CommentItem
              key={comment.id}
              comment={comment}
            />
          ))
        }
      </ul>
    </>
  );
}

export default memo(CommentList);
