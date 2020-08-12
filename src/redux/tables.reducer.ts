import { Action } from "redux";

interface DefaultState {
  loaded: {
    [table: string]: TableData;
  };
  completed: boolean;
  list: string[];
  countLoaded: number;
}
const defaultState: DefaultState = {
  completed: false,
  list: [],
  countLoaded: 0,
  loaded: {}
};

export enum TableActions {
  LOAD_TABLE,
  SET_TABLE_LIST
}

export interface TableData {
  data: any[] | {} | {error: true};
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
      const completed = state.list.length === countLoaded; 
      return {
        ...state,
        loaded: {
          ...state.loaded,
          [action.tableType as string]:{
            data: action.data,
            name: action.table
          }
        },
        countLoaded,
        completed
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
