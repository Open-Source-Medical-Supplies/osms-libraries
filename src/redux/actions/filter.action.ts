import { Dispatch } from "react";
import { FILTER_ACTIONS } from "../../shared/constants/filter.constants";
import { FilterState } from "../../shared/types/filter.type";
import ActiveLib from "../../shared/types/lib.enum";
import { LIB_ACTIONS } from "../lib.reducer";
import { RootState, TypedThunkAction } from "../root.reducer";

export const setMenuForUpcomingLib = (toLib: ActiveLib) => (dispatch: Dispatch<any>, getState: () => RootState) => {
  const {filter: { show }, env: { isMobile }} = getState();

  if (!isMobile) {
    if (toLib === ActiveLib.CATEGORY && show) {
      dispatch({ type: FILTER_ACTIONS.HIDE_MENU });
    } else if (toLib === ActiveLib.PROJECT && !show) {
      dispatch({ type: FILTER_ACTIONS.SHOW_MENU });
    }
  }
}

export const clearFilter = () => (dispatch: (o: any) => Promise<any>) => {
  dispatch({ type: FILTER_ACTIONS.CLEAR_FILTER });
  dispatch({ type: LIB_ACTIONS.RESET_LIB });
};

export const setAttributes = (
  newVal: FilterState["nodeFilters"]
): TypedThunkAction => (dispatch, getState) => {
  const {filter: {nodeFilters} } = getState();
  dispatch({
    type: FILTER_ACTIONS.SET_FILTER,
    payload: {
      nodeFilters: newVal,
      previousFilters: {
        nodeFilters
      }
    },
  });
};

export const setCategories = (
  newVal: FilterState["categoriesFilters"],
  oldVal?: FilterState["categoriesFilters"]
): TypedThunkAction => (dispatch, getState) => {
  /**
   * 20-08-24 BUG
   * There's some weird bug where categoriesFilters wasn't setting
   * State properly, but it existed in the component??
   * qed couldn't pull it in here
   */
  oldVal = oldVal || getState().filter.categoriesFilters;
  
  dispatch({
    type: FILTER_ACTIONS.SET_FILTER,
    payload: {
      categoriesFilters: newVal,
      previousFilters: {
        categoriesFilters: oldVal
      },
    },
  });
};

export const setSearchBar = (
  newVal: FilterState["searchBar"]
): TypedThunkAction => (dispatch, getState) => {
  const {filter: {searchBar} } = getState();
  dispatch({
    type: FILTER_ACTIONS.SET_FILTER,
    payload: {
      searchBar: newVal,
      previousFilters: {
        searchBar
      }
    },
  });
};