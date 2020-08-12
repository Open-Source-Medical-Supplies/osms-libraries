import { Action } from "redux";

interface DefaultState {
  loaded: boolean;
  tableList: string[];
  tableCount: number;
}
const defaultState: DefaultState = {
  loaded: false,
  tableList: [],
  tableCount: 0
};

export enum TableActionsType {
  LOAD_TABLE,
  SET_TABLE_LIST
}

export interface TableActions extends Action<TableActionsType> {
  data: any[];
  tableType?: string;
  table?: string;
}

export const tablesReducer = (
  state = defaultState,
  action: TableActions
) => {
  const tableCount = state.tableCount + 1;
  const loaded = state.tableList.length === tableCount; 

  switch (action.type) {
    case TableActionsType.LOAD_TABLE:
      const newState = {
        ...state,
        [action.tableType as string]:{
          data: action.data,
          name: action.table
        },
        tableCount,
        loaded
      };
      console.log(state);
      console.log(newState)
      return newState
    case TableActionsType.SET_TABLE_LIST:
      return {
        ...state,
        tableList: action.data 
      }
    default:
      return state;
  }
};
