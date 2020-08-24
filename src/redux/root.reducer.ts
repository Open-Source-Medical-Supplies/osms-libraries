import { Dispatch } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Action, combineReducers } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { envReducer } from './env.reducer';
import { filterReducer } from "./filter.reducer";
import { languageReducer } from "./language.reducer";
import { libReducer } from './lib.reducer';
import { selectedReducer } from "./selected.reducer";
import { tablesReducer } from "./tables.reducer";

export const rootReducer = combineReducers({
  lib: libReducer,
  env: envReducer,
  tables: tablesReducer,
  selected: selectedReducer,
  filter: filterReducer,
  lang: languageReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export type TypedThunkAction<D = any, R = any> = (
  dispatch: Dispatch<D>,
  getState: () => RootState
) => R
export type TypedThunkDispatch<A = any, T = any> = ThunkDispatch<RootState, T, Action<A>>;
// export type TypedThunkAction<A = any, P = any> = ThunkAction<Promise<P>, RootState, any, Action<A>>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
