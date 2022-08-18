import { State } from '../../types/state';

export const getRoom = (state: State) => state.Room.room;

export const getRoomLoadingStatus = (state: State) => state.Room.status;
