import { combineReducers } from "redux";
import { databaseReducer } from "./database.reducer";
import { checkMobileReducer } from "./check-mobile.reducer";

export const rootReducer = combineReducers({
    database: databaseReducer,
    checkMobile: checkMobileReducer
})

export interface RootState {
  checkMobile: ReturnType<typeof checkMobileReducer>
};