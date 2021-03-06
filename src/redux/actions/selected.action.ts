import { Dispatch } from "react";
import { SELECTED_ACTIONS } from "../../shared/constants/selected.constants";
import ActiveLib from "../../shared/types/lib.enum";
import { Selected } from '../../shared/types/selected.type';
import { PARAMS, setQueryParam } from "../../shared/utility/param-handling";
import { parseTablesToSupportingData } from "../../shared/utility/selected.utility";
import { RootState } from "../root.reducer";
import { setMenuForUpcomingLib } from './filter.action';

export const setSelectedByName = (
  name: string,
  matcher: string,
  fromType: string,
  toLib: ActiveLib,
  origin?: Selected
) => (
  dispatch: Dispatch<any>,
  getState: () => RootState
) => {
  const {tables} = getState();
  const data = (tables.loaded[fromType] as any[]).find((o: any) => o && o[matcher] === name)
  dispatch(setSelected(data, toLib, origin));
}

// pass 'lib' if it's not the current lib
export const setSelected = (
  data: Selected,
  lib?: ActiveLib,
  origin?: Selected
) => (
  dispatch: Dispatch<any>,
  getState: () => RootState
) => {
  if (!data) return;
  const { displayName } = data;
  const { tables } = getState();
  const supportingData = parseTablesToSupportingData(
    tables.loaded,
    displayName,
    lib
  );
  setQueryParam({ key: PARAMS.SELECTED, val: displayName });

  if (lib) {
    dispatch(setMenuForUpcomingLib(lib))
  }

  dispatch({
    type: SELECTED_ACTIONS.SET_SELECTED,
    data,
    supportingData,
    origin
  })
};
