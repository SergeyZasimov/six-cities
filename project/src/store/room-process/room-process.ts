import { createSlice } from '@reduxjs/toolkit';
import { DomainNameSpace, LoadingStatus } from '../../const';
import { Offer } from '../../types/offer';
import { fetchRoomAction } from './async-actions';

type RoomProcess = {
  room: Offer;
  status: LoadingStatus;
};

const initialState: RoomProcess = {
  room: {} as Offer,
  status: LoadingStatus.Idle,
};

export const roomProcess = createSlice({
  name: DomainNameSpace.Room,
  initialState,
  reducers: {
    toggleFavoriteRoom: (state, action) => {
      const { payload: offer } = action;
      if (offer.id === state.room.id) {
        state.room.isFavorite = !state.room.isFavorite;
      }
    },
    resetLoadingStatus: (state) => {
      state.status = LoadingStatus.Idle;
    },
    resetFavoritesRoom: (state) => {
      state.room.isFavorite = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomAction.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(fetchRoomAction.fulfilled, (state, action) => {
        state.room = action.payload;
        state.status = LoadingStatus.Success;
      })
      .addCase(fetchRoomAction.rejected, (state) => {
        state.status = LoadingStatus.Failed;
      });
  },
});

export const { toggleFavoriteRoom, resetLoadingStatus, resetFavoritesRoom } =
  roomProcess.actions;
