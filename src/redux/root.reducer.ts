import { combineReducers } from "redux";
import databaseReducer from "./database.reducer";
import checkMobileReducer from "./check-mobile.reducer";
import libReducer from './lib.reducer';

export const rootReducer = combineReducers({
  checkMobile: checkMobileReducer,
  database: databaseReducer,
  lib: libReducer,
})

export interface RootState {
  checkMobile: ReturnType<typeof checkMobileReducer>;
  lib: ReturnType<typeof libReducer>;
};