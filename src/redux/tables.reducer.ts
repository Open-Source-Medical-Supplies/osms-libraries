import { Action } from "redux";
import { Material } from "../classes/material.class";
import { Project } from "../classes/project.class";
import { toDict } from "../shared/utility/general.utility";

export interface TableState {
  loaded: {
    [table: string]: TableData;
  };
  completed: boolean;
  list: string[];
  countLoaded: number;
}
const defaultState: TableState = {
  completed: false,
  list: [],
  countLoaded: 0,
  loaded: {}
};

export enum TABLE_ACTIONS {
  LOAD_TABLE,
  SET_TABLE_LIST
}

export type TableData = any[] | {} | {error: true};

export interface TableAction extends Action<TABLE_ACTIONS> {
  data: any;
  tableType?: string;
  table?: string;
}

export const tablesReducer = (
  state = defaultState,
  action: TableAction
): TableState => {
  switch (action.type) {
    case TABLE_ACTIONS.LOAD_TABLE:
      const countLoaded = state.countLoaded + 1;
      const completed = state.list.length === countLoaded;
      let loadNewData: TableState['loaded'];

      switch (action.table) {
        case 'Material':
          loadNewData = {
            [action.tableType as string]: toDict<Material>(action.data, 'name')
          }
          break;
        case 'Project':
          loadNewData = {
            [action.tableType as string]: action.data,
            projectsByCategory: toDict<Project>(action.data, 'name'),
          }
          break;
        default:
          loadNewData = {
            [action.tableType as string]: action.data,
          }
      }

      return {
        ...state,
        loaded: {
          ...state.loaded,
          ...loadNewData
        },
        countLoaded,
        completed
      };
    case TABLE_ACTIONS.SET_TABLE_LIST:
      return {
        ...state,
        list: action.data 
      }
    default:
      return state;
  }
};
