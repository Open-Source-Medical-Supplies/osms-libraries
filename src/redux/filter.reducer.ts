import { Dispatch } from 'react';
import { Action } from 'redux';
import { FILTER_ACTIONS } from '../shared/constants/filter.constants';
import { FilterState } from '../shared/types/filter.type';
import { PARAMS, removeParam } from '../shared/utility/param-handling';
import { LIB_ACTIONS } from './lib.reducer';

export interface FilterAction extends Action<FILTER_ACTIONS> {
  payload?: Partial<FilterState>;
};

export type DispatchFilterAction = Dispatch<FilterAction | Function>;

// const catCompare = new CategoryComparator();

export type SetFilterFn = (props: Partial<FilterState>) => void;

const FilterStateDefault: FilterState = {
  loaded: false,
  nodes: [], // attributes
  flatNodes: {},
  nodeFilters: {},
  categories: [],
  categoriesFilters: {},
  filters: {},
  searchBar: "",
  previousFilters: {
    nodeFilters: {},
    categoriesFilters: {},
    searchBar: "",
  },
  show: false,
  isFiltering: false
};

export const clearFilter = () => (
  dispatch: (o: any) => Promise<any>,
) => {
  dispatch({ type: FILTER_ACTIONS.CLEAR_FILTER });
  dispatch({ type: LIB_ACTIONS.RESET_LIB });
};

export const filterReducer = (
  state = FilterStateDefault,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case FILTER_ACTIONS.START_FILTERING:
      return {
        ...state,
        isFiltering: true
      }
    case FILTER_ACTIONS.STOP_FILTERING:
      return {
        ...state,
        isFiltering: false
      }
    case FILTER_ACTIONS.CLEAR_FILTER:
      removeParam(PARAMS.FILTERSTATE);
      return {
        ...state,
        nodeFilters: {},
        categoriesFilters: {},
        searchBar: "",
        previousFilters: {
          searchBar: state.searchBar,
          nodeFilters: state.nodeFilters,
          categoriesFilters: state.categoriesFilters,
        },
        isFiltering: false
      };
    case FILTER_ACTIONS.SET_FILTER:
      if (!action?.payload) return state;

      return {
        ...state,
        ...action.payload,
        previousFilters: {
          ...state.previousFilters,
          ...action.payload.previousFilters,
        }
      }
    case FILTER_ACTIONS.TOGGLE_FILTER_MENU:
      if (!action?.payload?.show) return state;

      return {
        ...state,
        show: action.payload.show
      }
    default:
      return state;
  }
}
