import { Action } from 'redux';
import { CategoryInfo } from '../shared/classes/category-info.class';
import { Project } from '../shared/classes/project.class';

export enum VIEW_ACTION {
  SET,
  UPDATE, // update based on filtering
  RESET   // reset to an unfiltered state
}

export interface ViewAction extends Action<VIEW_ACTION> {
  data?: CategoryInfo[] | Project[];
}

const defaultState = {
  _records: [],
  records: []
}

export const viewReducer = (
  state = defaultState,
  action: ViewAction
) => {
  switch (action.type) {
    case VIEW_ACTION.SET:
      return {
        _records: action.data,
        records: action.data
      }
    case VIEW_ACTION.UPDATE:
      return {
        _records: state._records,
        records: action.data
      }
    case VIEW_ACTION.RESET:
      return {
        _records: state._records,
        records: state._records
      }
    default:
      return state;
  }
}