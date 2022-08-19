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

const sortCommentsByDate = ( commentA: Comment, commentB: Comment ) => {
  const dateA = dayjs(commentA.date);
  const dateB = dayjs(commentB.date);
  return dateB.diff(dateA);
};

const prepareComments = ( comments: Comment[] ): Comment[] => (
  [...comments]
    .sort(sortCommentsByDate)
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
