import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, StateAction } from '../const';
import { Comment } from '../types/comment';
import { Offer } from '../types/offer';

export const changeLocation = createAction<{ location: string }>(
  StateAction.Location.ChangeLocation,
);

export const setOffers = createAction<Offer[]>(StateAction.Offer.LoadOffers);

export const setLoadDataStatus = createAction<boolean>(
  StateAction.Offer.LoadStatus,
);

export const setAuthorizationStatus = createAction<AuthorizationStatus>(
  StateAction.User.RequireAuthorization,
);

export const setServerError = createAction<string | null>(
  StateAction.Error.ServerError,
);

export const redirectToRoute = createAction<AppRoute>(
  StateAction.User.RedirectToRoute,
);

export const setCommentList = createAction<Comment[]>(
  StateAction.Comment.LoadComments,
);

export const setRoom = createAction<Offer>(StateAction.Offer.LoadOffer);

export const setNearbyOffers = createAction<Offer[]>(
  StateAction.Offer.LoadNearbyOffers,
);

export const setUserName = createAction<string>(StateAction.User.SetUserName);
