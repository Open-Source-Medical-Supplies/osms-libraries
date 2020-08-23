import { Dispatch } from "react";
import { FILTER_ACTIONS } from "../../shared/constants/filter.constants";
import { TABLE_MAPPING } from "../../shared/constants/general.constants";
import ActiveLib, { ActiveLibToClassName } from "../../shared/types/lib.enum";
import { ActiveType, LIB_ACTIONS } from "../lib.reducer";
import { RootState } from "../root.reducer";
import { SELECTED_ACTIONS } from "../../shared/constants/selected.constants";

export interface SetLibOptions {
  keepFilter?: boolean;
  keepSelected?: boolean;
}

// Used as dispatch(setLib(...));
// All dispatch calls run by default
export const setLib = (val: ActiveLib, options?: SetLibOptions) => (dispatch: Dispatch<any>, getState: () => RootState) => {
  const {tables} = getState();

  if (!options?.keepFilter) {
    dispatch({ type: FILTER_ACTIONS.CLEAR_FILTER });
  }
  
  if (!(options?.keepSelected)) {
    dispatch({ type: SELECTED_ACTIONS.CLEAR_SELECTED })
  }

  const focus = tables.loaded[TABLE_MAPPING[ActiveLibToClassName[val]]] as ActiveType;
  dispatch({
    type: LIB_ACTIONS.SET_LIB,
    active: val,
    _data: focus,
    data: focus,
  });
}