import { createAction } from '@reduxjs/toolkit';
import { AppRoute, StateAction } from '../const';

export const redirectToRoute = createAction<AppRoute>(
  StateAction.User.RedirectToRoute,
);
