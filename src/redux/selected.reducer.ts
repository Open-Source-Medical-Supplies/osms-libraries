import loGet from "lodash.get";
import { Action } from "redux";
import { CategoryInfo } from "../shared/classes/category-info.class";
import { Project, CrossLinks } from "../shared/classes/project.class";
import {
  getParam,
  PARAMS,
  updateQueryParam,
  removeParam,
} from "../shared/utility/param-handling";

export enum SELECTED_ACTIONS {
  SET = 'SET',
  CHECK = 'CHECK',
  CLEAR = 'CLEAR',
}

type Selected = null | undefined | CategoryInfo | Project;

interface SelectedStateCheck {
  dataSet?: Selected[];
  selector?: string;
}
export interface SelectedState extends SelectedStateCheck {
  data?: Selected;
  projects?: Project[];
  projectSet?: CrossLinks;
}
export type SelectAction = Action<SELECTED_ACTIONS> & SelectedState;

const defaultState: SelectedState = {};

export const selectedReducer = (
  state = defaultState,
  action: SelectAction
): SelectedState => {
  const getProjects = (name: string | undefined) =>
    name && action.projectSet ? action.projectSet[name] : [];

  switch (action.type) {
    case SELECTED_ACTIONS.CHECK:
      const selector = action.selector || "displayName";
      const param = getParam(PARAMS.SELECTED, true);
      let selected: Selected = undefined;

      if (param && action.dataSet) {
        selected = action.dataSet.find(
          (r: any) => loGet(r, selector) === param
        );
      }
      return selected
        ? {
            data: selected,
            projects: getProjects(selected.displayName),
          }
        : defaultState;

    case SELECTED_ACTIONS.SET:
      if (!action.data) {
        return defaultState;
      }
      const { displayName } = action.data;
      updateQueryParam({ key: PARAMS.SELECTED, val: displayName });

      return {
        data: action.data,
        projects: getProjects(displayName),
      };
    case SELECTED_ACTIONS.CLEAR:
      removeParam(PARAMS.SELECTED);
      return defaultState;
    default:
      // TODO console.log('I dunno about this. Shouldn\'t it be state?')      
      return defaultState;
  }
};
