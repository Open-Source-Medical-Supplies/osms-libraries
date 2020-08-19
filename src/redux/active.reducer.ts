import { Action } from "redux";
import { CategoryInfo } from "../shared/classes/category-info.class";
import { Project } from "../shared/classes/project.class";

type ActiveType = Project[] | CategoryInfo[] | [];

interface ActiveState {
  _data?: ActiveType,
  data?: ActiveType
}

const defaultState: ActiveState = {
  _data: [],
  data: []
}

export enum ACTIVE_ACTIONS {
  SET_ACTIVE = 'SET_ACTIVE',
  FILTER_ACTIVE = 'FILTER_ACTIVE',
  RESET_ACTIVE = 'RESET_ACTIVE',
}

export interface ActiveActions extends Action<ACTIVE_ACTIONS>, ActiveState {}

export const activeReducer = (
  state = defaultState,
  action: ActiveActions
) => {
  switch (action.type) {
    case ACTIVE_ACTIONS.SET_ACTIVE:
      return {
        _data: action._data || [],
        data: action.data || [],
      }
    case ACTIVE_ACTIONS.FILTER_ACTIVE:
      return {
        _data: state._data || [],
        data: action.data || []
      }
    case ACTIVE_ACTIONS.RESET_ACTIVE:
      return {
        _data: state._data || [],
        data: state._data || []
      }
    default:
      return state;
  }
}