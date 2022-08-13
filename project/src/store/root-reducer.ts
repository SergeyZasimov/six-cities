import { combineReducers } from '@reduxjs/toolkit';
import { DomainNameSpace } from '../const';
import { userProcess } from './user-process/user-process';
import { dataProcess } from './data-process/data-process';
import { locationProcess } from './location-process/location-process';

export const rootReducer = combineReducers({
  [DomainNameSpace.User]: userProcess.reducer,
  [DomainNameSpace.Data]: dataProcess.reducer,
  [DomainNameSpace.Location]: locationProcess.reducer,
});
