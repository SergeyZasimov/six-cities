import { DomainNameSpace } from '../../const';
import { State } from '../../types/state';

export const getCommentsList = (state: State) =>
  state[DomainNameSpace.Comments].commentsList;

export const getSendingStatus = (state: State) =>
  state[DomainNameSpace.Comments].status;
