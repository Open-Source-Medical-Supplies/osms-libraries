import { Action } from 'redux';
import ActiveLib from '../shared/types/lib.enum';
import { setQueryParam, PARAMS, getParam } from '../shared/utility/param-handling';
import { Project } from '../shared/classes/project.class';
import { CategoryInfo } from '../shared/classes/category-info.class';
import { Dispatch } from 'react';

export enum LIB_ACTIONS {
  SET_LIB = 'SET_LIB',
  LOAD_LIB = 'LOAD_LIB',
  FILTER_LIB = 'FILTER_LIB',
  RESET_LIB = 'RESET_LIB',
}

export type ActiveType = Project[] | CategoryInfo[] | [];

export interface LibState {
  active: ActiveLib;
  _data?: ActiveType;
  data?: ActiveType;
}

export interface LibAction extends Action<LIB_ACTIONS>, LibState {};

export type DispatchLibAction = Dispatch<LibAction>;

const libState: Required<LibState> = {
  active: ActiveLib.CATEGORY,
  _data: [],
  data: [] 
};

export const libReducer = (
  state = libState,
  action: LibAction
): Required<LibState> => {
  switch (action.type) {
    case LIB_ACTIONS.SET_LIB:
      setQueryParam({ key: PARAMS.LIBRARY, val: action.active })
      return {
        active: action.active,
        _data: action._data || [],
        data: action.data || []
      };
    case LIB_ACTIONS.LOAD_LIB:
      const active = getParam(PARAMS.LIBRARY);
      if (active) {
        return {
          ...libState,
          active,
        };
      }
      setQueryParam({key: PARAMS.LIBRARY, val: state.active })
      return state;
    default:
      return state;
  }
}