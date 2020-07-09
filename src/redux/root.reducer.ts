import { combineReducers } from "redux";
import { envReducer } from './env.reducer';
import { libReducer } from './lib.reducer';

export const rootReducer = combineReducers({
  lib: libReducer,
  env: envReducer
})

export interface RootState {
  lib: ReturnType<typeof libReducer>;
  env: ReturnType<typeof envReducer>
};