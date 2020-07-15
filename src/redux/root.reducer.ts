import { combineReducers } from "redux";
import { envReducer } from './env.reducer';
import { libReducer } from './lib.reducer';
import { langReducer } from "./lang.reducer";

export const rootReducer = combineReducers({
  lib: libReducer,
  env: envReducer,
  lang: langReducer
})

export interface RootState {
  lib: ReturnType<typeof libReducer>;
  env: ReturnType<typeof envReducer>;
  lang: ReturnType<typeof langReducer>;
};