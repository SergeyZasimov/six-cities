import { createSlice } from '@reduxjs/toolkit';
import { DomainNameSpace } from '../../const';
import { DataProcess } from '../../types/state';
import {
  fetchFavoriteOffers,
  fetchOffersAction,
  fetchRoomAction,
  sendNewComment,
} from '../api-actions';

const initialState: DataProcess = {
  offers: [],
  room: null,
  commentList: [],
  nearbyOffers: [],
  isDataLoading: false,
  isDataSending: false,
  favoriteOffers: [],
};

export const dataProcess = createSlice({
  name: DomainNameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
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
        state.isDataSending = true;
      })
      .addCase(sendNewComment.fulfilled, (state, action) => {
        state.commentList = action.payload;
        state.isDataSending = false;
      })
      .addCase(sendNewComment.rejected, (state) => {
        state.isDataSending = false;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      });
  },
});
