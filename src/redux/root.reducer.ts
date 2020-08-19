import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers, Action } from "redux";
import { envReducer } from './env.reducer';
import { libReducer } from './lib.reducer';
import { selectedReducer } from "./selected.reducer";
import { tablesReducer } from "./tables.reducer";
import { filterReducer } from "./filter.reduer";
import { activeReducer } from "./active.reducer";
import { ThunkDispatch, ThunkAction } from "redux-thunk";

export const rootReducer = combineReducers({
  lib: libReducer,
  env: envReducer,
  tables: tablesReducer,
  selected: selectedReducer,
  filter: filterReducer,
  active: activeReducer
})


export type RootState = ReturnType<typeof rootReducer>;
export type TypedThunkDispatch<A = any, T = any> = ThunkDispatch<RootState, T, Action<A>>;
export type TypedThunkAction<A = any, P = any> = ThunkAction<Promise<P>, RootState, any, Action<A>>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
