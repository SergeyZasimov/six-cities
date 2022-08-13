import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY_NAME, DomainNameSpace } from '../../const';
import { LocationProcess } from '../../types/state';

const initialState: LocationProcess = {
  currentLocation: DEFAULT_CITY_NAME,
};

export const locationProcess = createSlice({
  name: DomainNameSpace.Location,
  initialState,
  reducers: {
    changeLocation: ( state, action ) => {
      state.currentLocation = action.payload;
    }
  }
});

export const { changeLocation } = locationProcess.actions;
