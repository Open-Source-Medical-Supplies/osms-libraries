import { Dispatch } from "react";
import { TABLE_MAPPING } from "../../shared/constants/general.constants";
import { SELECTED_ACTIONS } from "../../shared/constants/selected.constants";
import ActiveLib, { ActiveLibToClassName } from "../../shared/types/lib.enum";
import { ActiveType, LIB_ACTIONS } from "../lib.reducer";
import { RootState } from "../root.reducer";
import { clearFilter } from "./filter.action";
import { FILTER_ACTIONS } from "../../shared/constants/filter.constants";

export interface SetLibOptions {
  keepFilter?: boolean;
  keepSelected?: boolean;
  followUp?: Function;
}

export const setLib = (val: ActiveLib) => (dispatch: Dispatch<any>, getState: () => RootState) => {
  const {tables} = getState();
  const focus = tables.loaded[TABLE_MAPPING[ActiveLibToClassName[val]]] as ActiveType;
  dispatch({
    type: LIB_ACTIONS.SET_LIB,
    active: val,
    _data: focus,
    data: focus,
  });
}

// Used as dispatch(changeLib(...));
// All dispatch calls run by default
export const changeLib = (val: ActiveLib, options?: SetLibOptions) => (dispatch: Dispatch<any>, getState: () => RootState) => {
  const state = getState();

  if (!options?.keepFilter) {
    dispatch(clearFilter());
  }
  
  if (!(options?.keepSelected)) {
    dispatch({ type: SELECTED_ACTIONS.CLEAR_SELECTED })
  }

  if (val === ActiveLib.CATEGORY && state.filter.show) {
    dispatch({ type: FILTER_ACTIONS.HIDE_MENU });
  } else if (val === ActiveLib.PROJECT && !state.filter.show) {
    dispatch({ type: FILTER_ACTIONS.SHOW_MENU });
  }

  dispatch(setLib(val));
}