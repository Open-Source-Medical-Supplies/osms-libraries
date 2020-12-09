import { Action } from "redux";
import { BasicObject } from "../shared/types/shared.type";

export enum TABLE_ACTIONS {
  LOAD_TABLE = 'LOAD_TABLE',
	SET_TABLE_LIST = 'SET_TABLE_LIST',
	TABLES_RESET = 'TABLES_RESET'
}
export type TableDataError = { error: true };
export type TableData = any[] | BasicObject<any> | TableDataError;
export interface TableAction extends Action<TABLE_ACTIONS> {
  data: any;
  tableType?: string;
  table?: string;
}
export type LoadedTable = {
	[key: string]: TableData;
}
export interface TableState {
  loaded: LoadedTable;
  completed: boolean;
  list: string[];
	countLoaded: number;
	error: {
		partial: boolean;
		full: boolean;
	} | false;
}

const defaultState: TableState = {
  completed: false,
  list: [],
  countLoaded: 0,
	loaded: {},
	error: {
		partial: false,
		full: false
	}
};

const checkErrors = (loaded: LoadedTable, list: string[]): TableState['error'] => {
	let errorCount = 0;

	for (const tableName in loaded) {
		const table = loaded[tableName];
		if (!Array.isArray(table) && table.error) {
			errorCount += 1;
		}
	}

	return errorCount > 0 ? {
		partial: errorCount > 0 && list.length !== errorCount,
		full: list.length === errorCount
	} : false;
};

export const tablesReducer = (
  state = defaultState,
  action: TableAction
): TableState => {
  switch (action.type) {
    case TABLE_ACTIONS.LOAD_TABLE:
			const { list, loaded } = state;
			const countLoaded = state.countLoaded + 1;
			const completed = list.length === countLoaded;
			const error = checkErrors(loaded, list);

      return {
        ...state,
        loaded: {
          ...loaded,
          [action.tableType as string]: action.data
        },
        countLoaded,
				completed,
				error
      };
    case TABLE_ACTIONS.SET_TABLE_LIST:
      return {
        ...state,
        list: action.data 
			}
		case TABLE_ACTIONS.TABLES_RESET:
			return {
				...defaultState
			}
    default:
      return state;
  }
};
