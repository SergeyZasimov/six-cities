import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, DomainNameSpace } from '../../const';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from './async-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userName: '',
};

export const userProcess = createSlice({
  name: DomainNameSpace.User,
  initialState,
  reducers: {},
  extraReducers( builder ) {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
      })
      .addCase(checkAuthAction.fulfilled, ( state, action ) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userName = action.payload;
      })
      .addCase(checkAuthAction.rejected, ( state ) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userName = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userName = '';
      });
  }
});
