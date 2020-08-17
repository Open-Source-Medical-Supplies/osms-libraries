import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux";
import { envReducer } from './env.reducer';
import { libReducer } from './lib.reducer';
import { selectedReducer } from "./selected.reducer";
import { tablesReducer } from "./tables.reducer";

export const rootReducer = combineReducers({
  lib: libReducer,
  env: envReducer,
  tables: tablesReducer,
  selected: selectedReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
