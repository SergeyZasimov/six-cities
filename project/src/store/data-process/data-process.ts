import { createSlice } from '@reduxjs/toolkit';
import { DomainNameSpace } from '../../const';
import { DataProcess } from '../../types/state';
import { fetchOffersAction, fetchRoomAction } from '../api-actions';

const initialState: DataProcess = {
  offers: [],
  room: null,
  commentList: [],
  nearbyOffers: [],
  isDataLoading: false,
  isDataSending: false,
};

export const dataProcess = createSlice({
  name: DomainNameSpace.Data,
  initialState,
  reducers: {},
  extraReducers( builder ) {
    builder
      .addCase(fetchOffersAction.pending, ( state ) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, ( state, action ) => {
        state.isDataLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, ( state ) => {
        state.isDataLoading = false;
      })
      .addCase(fetchRoomAction.pending, ( state ) => {
        state.isDataLoading = true;
      })
      .addCase(fetchRoomAction.fulfilled, ( state, action ) => {
        state.room = action.payload.room;
        state.commentList = action.payload.comments;
        state.nearbyOffers = action.payload.nearbyOffers;
        state.isDataLoading = false;
      })
      .addCase(fetchRoomAction.rejected, ( state ) => {
        state.isDataLoading = false;
      });
  }
});
