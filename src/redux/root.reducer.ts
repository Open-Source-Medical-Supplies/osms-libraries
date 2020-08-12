import { combineReducers } from "redux";
import { envReducer } from './env.reducer';
import { libReducer } from './lib.reducer';
import { langReducer } from "./lang.reducer";
import { tablesReducer } from "./tables.reducer";

export const rootReducer = combineReducers({
  lib: libReducer,
  env: envReducer,
  lang: langReducer,
  tables: tablesReducer
})

export interface RootState {
  lib: ReturnType<typeof libReducer>;
  env: ReturnType<typeof envReducer>;
  lang: ReturnType<typeof langReducer>;
  tables: ReturnType<typeof tablesReducer>
};