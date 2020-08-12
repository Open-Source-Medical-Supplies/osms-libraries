import { combineReducers } from "redux";
import { envReducer } from './env.reducer';
import { libReducer } from './lib.reducer';
import { langReducer } from "./lang.reducer";
import { tablesReducer } from "./tables.reducer";
import { selectedReducer } from "./selected.reducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const rootReducer = combineReducers({
  lib: libReducer,
  env: envReducer,
  lang: langReducer,
  tables: tablesReducer,
  selected: selectedReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
