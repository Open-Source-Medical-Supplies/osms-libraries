import { Action } from 'redux';
import ActiveLib from '../shared/types/lib.enum';
import { setQueryParam, PARAMS, getParam } from '../shared/utility/param-handling';

export enum LIB_ACTIONS {
  LIB_SET = 'SET_LIB',
  LIB_START = 'LOAD_LIB'
}

export interface LibAction extends Action<LIB_ACTIONS> {
  lib: ActiveLib
};

export const libReducer = (
  state = ActiveLib.CATEGORY,
  action: LibAction
): ActiveLib => {
  console.log('lib switch')
  switch (action.type) {
    case LIB_ACTIONS.LIB_SET:
      setQueryParam({ key: PARAMS.LIBRARY, val: action.lib })
      return action.lib;
    case LIB_ACTIONS.LIB_START:
      const lib = getParam(PARAMS.LIBRARY);
      if (lib) {
        return lib;
      }
      setQueryParam({key: PARAMS.LIBRARY, val: state })
      return state;
    default:
      return state;
  }
}