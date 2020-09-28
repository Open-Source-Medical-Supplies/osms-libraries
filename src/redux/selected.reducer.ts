import loGet from "lodash.get";
import { SELECTED_ACTIONS } from "../shared/constants/selected.constants";
import { SelectAction, Selected, SelectedState, SupportingData } from "../shared/types/selected.type";
import {
  getParam,
  PARAMS,
  removeParam
} from "../shared/utility/param-handling";
import { parseTablesToSupportingData } from "../shared/utility/selected.utility";

const defaultState: SelectedState = {
  data: undefined,
  supportingData: undefined
};

export const selectedReducer = (
  _ = defaultState,
  action: SelectAction
): SelectedState => {
  let supportingData: SupportingData;
  
  switch (action.type) {
    case SELECTED_ACTIONS.CHECK_SELECTED:
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
    case SELECTED_ACTIONS.SET_SELECTED:
      if (!action.data || !action.supportingData) {
        console.warn('Attempted to set selected view without enough data');
        return defaultState;
      }
      return {
        data: action.data,
        supportingData: action.supportingData,
        origin: action.origin
      };
    case SELECTED_ACTIONS.CLEAR_SELECTED:
      removeParam(PARAMS.SELECTED);
      return defaultState;
    default:
      return defaultState;
  }
};
