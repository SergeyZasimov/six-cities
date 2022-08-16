import { createSlice } from '@reduxjs/toolkit';
import { DomainNameSpace, SendingStatus } from '../../const';
import { DataProcess } from '../../types/state';
import {
  fetchFavoriteOffers,
  fetchOffersAction,
  fetchRoomAction,
  sendNewComment,
  toggleFavorite,
} from '../api-actions';

const initialState: DataProcess = {
  offers: [],
  room: null,
  commentList: [],
  nearbyOffers: [],
  isDataLoading: false,
  SendingStatus: SendingStatus.Unknown,
  favoriteOffers: [],
};

export const dataProcess = createSlice({
  name: DomainNameSpace.Data,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchRoomAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchRoomAction.fulfilled, (state, action) => {
        state.room = action.payload.room;
        state.commentList = action.payload.comments;
        state.nearbyOffers = action.payload.nearbyOffers;
        state.isDataLoading = false;
      })
      .addCase(fetchRoomAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(sendNewComment.pending, (state) => {
        state.SendingStatus = SendingStatus.Sending;
      })
      .addCase(sendNewComment.fulfilled, (state, action) => {
        state.commentList = action.payload;
        state.SendingStatus = SendingStatus.Success;
      })
      .addCase(sendNewComment.rejected, (state) => {
        state.SendingStatus = SendingStatus.Error;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const {payload: offer} = action;

        if (offer.isFavorite) {
          state.favoriteOffers.push(offer);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((item) => item.id !== offer.id);
        }
        const currentOffer = state.offers.find((item) => item.id === offer.id);
        if (currentOffer) {
          currentOffer.isFavorite = !currentOffer.isFavorite;
        }

        const currentNearbyOffer = state.nearbyOffers.find((item) => item.id === offer.id);
        if (currentNearbyOffer) {
          currentNearbyOffer.isFavorite = !currentNearbyOffer.isFavorite;
        }

        if (offer.id === state.room?.id) {
          state.room.isFavorite = !state.room?.isFavorite;
        }
      });
  },
});

