import { resetFavoritesRoom, resetLoadingStatus, roomProcess, toggleFavoriteRoom } from './room-process';
import { RoomProcess } from '../../types/state';
import { createMockOffer } from '../../faker-mocks/create-mock-offer';
import { LoadingStatus } from '../../const';
import { fetchRoomAction } from './async-actions';
import { Offer } from '../../types/offer';

const offer = createMockOffer();

describe('Reducer: roomProcess', () => {
  it('should return initial state', () => {
    expect(roomProcess.reducer(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual({ room: {}, status: 'IDLE' });
  });

  it('should toggle isFavorite field', () => {
    const state: RoomProcess = {
      room: offer,
      status: LoadingStatus.Idle
    };
    expect(roomProcess.reducer(state, toggleFavoriteRoom(offer)))
      .toEqual({ room: { ...offer, isFavorite: !offer.isFavorite }, status: LoadingStatus.Idle });
  });

  it('should reset loading status', () => {
    const state: RoomProcess = {
      room: offer,
      status: LoadingStatus.Failed
    };
    expect(roomProcess.reducer(state, resetLoadingStatus()))
      .toEqual({ room: offer, status: LoadingStatus.Idle });
  });

  it('should toggle isFavorite field to false', () => {
    const favoriteOffer = { ...offer, isFavorite: true };
    const state: RoomProcess = {
      room: favoriteOffer,
      status: LoadingStatus.Success
    };
    expect(roomProcess.reducer(state, resetFavoritesRoom()))
      .toEqual({ room: { ...offer, isFavorite: false }, status: LoadingStatus.Success });
  });

  it('should update room by load server data', () => {
    const state: RoomProcess = {
      room: {} as Offer,
      status: LoadingStatus.Idle
    };
    expect(roomProcess.reducer(state, { type: fetchRoomAction.fulfilled.type, payload: offer }))
      .toEqual({
        room: offer,
        status: LoadingStatus.Success
      });
  });

  it('should toggle loading status to fail', () => {
    const state: RoomProcess = {
      room: {} as Offer,
      status: LoadingStatus.Idle
    };
    expect(roomProcess.reducer(state, { type: fetchRoomAction.rejected.type }))
      .toEqual({
        room: {},
        status: LoadingStatus.Failed
      });
  });
});
