import { Action } from "redux";

interface DefaultState {
  [table: string]: any | TableData;
  loaded: boolean;
  list: string[];
  countLoaded: number;
}
const defaultState: DefaultState = {
  loaded: false,
  list: [],
  countLoaded: 0
};

export enum TableActions {
  LOAD_TABLE,
  SET_TABLE_LIST
}

export interface TableData {
  data: any;
  name: string;
}

export interface TableAction extends Action<TableActions> {
  data: any;
  tableType?: string;
  table?: string;
}

export const tablesReducer = (
  state = defaultState,
  action: TableAction
) => {
  switch (action.type) {
    case TableActions.LOAD_TABLE:
      const countLoaded = state.countLoaded + 1;
      const loaded = state.list.length === countLoaded; 
      return {
        ...state,
        [action.tableType as string]:{
          data: action.data,
          name: action.table
        },
        countLoaded,
        loaded
      };
    case TableActions.SET_TABLE_LIST:
      return {
        ...state,
        tableList: action.data 
      }
    default:
      return state;
  }
};
