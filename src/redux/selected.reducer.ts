import loGet from "lodash.get";
import { SELECTED_ACTIONS } from "../shared/constants/selected.constants";
import { SelectAction, Selected, SelectedState, SupportingData } from "../shared/types/selected.type";
import {
  getParam,
  PARAMS,
  removeParam, setQueryParam
} from "../shared/utility/param-handling";
import { parseTablesToSupportingData } from "../shared/utility/selected.utility";

const defaultState = {};

export const selectedReducer = (
  _ = defaultState,
  action: SelectAction
): SelectedState => {
  let supportingData: SupportingData;
  
  switch (action.type) {
    case SELECTED_ACTIONS.CHECK:
      const selector = action.selector || "displayName";
      const param = getParam(PARAMS.SELECTED);
      
      if (param && action.dataSet) {
        let selected: Selected = null;
        selected = action.dataSet.find(
          (r: any) => loGet(r, selector) === param
        );
        if (selected && action.supportingDataSet) {
          supportingData = parseTablesToSupportingData(action.supportingDataSet, selected.displayName);
          return {
            data: selected,
            supportingData
          }
        }
      }
      return defaultState;
    case SELECTED_ACTIONS.SET:
      if (!action.data || !action.supportingDataSet) {
        console.warn('Attempted to set selected view without enough data');
        return defaultState;
      }
      const { displayName } = action.data;
      setQueryParam({ key: PARAMS.SELECTED, val: displayName });
      supportingData = parseTablesToSupportingData(action.supportingDataSet, displayName);

      return {
        data: action.data,
        supportingData,
      };
    case SELECTED_ACTIONS.CLEAR:
      removeParam(PARAMS.SELECTED);
      return defaultState;
    default:
      return defaultState;
  }
};
