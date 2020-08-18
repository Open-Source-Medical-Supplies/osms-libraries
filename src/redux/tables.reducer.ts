import { Action } from "redux";
import { BasicObject } from "../shared/types/shared.type";

export interface TableState {
  loaded: {
    [key: string]: TableData;
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
  LOAD_TABLE = 'LOAD_TABLE',
  SET_TABLE_LIST = 'SET_TABLE_LIST'
}

export type TableData = any[] | BasicObject<any> | {error: true};

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

      return {
        ...state,
        loaded: {
          ...state.loaded,
          [action.tableType as string]: action.data
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
