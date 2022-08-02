import { reducer } from '../reducer';
import { Middleware } from '@reduxjs/toolkit';
import { StateAction } from '../../const';
import { browserHistory } from '../../browser-history';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  ( _store ) =>
    ( next ) =>
      ( action ) => {
        if (action.type === StateAction.User.RedirectToRoute) {
          browserHistory.push(action.payload);
        }
        return next(action);
      };
