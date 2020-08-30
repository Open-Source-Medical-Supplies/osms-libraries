import { Dispatch } from 'react';
import { Action } from 'redux';
import { FILTER_ACTIONS } from '../shared/constants/filter.constants';
import { FilterState } from '../shared/types/filter.type';
import { PARAMS, removeParam } from '../shared/utility/param-handling';
import { BasicObject } from '../shared/types/shared.type';
import { FilterNodeData } from '../shared/types/filter-node.type';

export interface FilterAction extends Action<FILTER_ACTIONS> {
  payload?: Partial<FilterState>;
};

export type DispatchFilterAction = Dispatch<FilterAction | Function>;


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
  isFiltering: false,
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
      const temp = {
        ...state,
        ...action.payload,
        previousFilters: {
          ...state.previousFilters,
          ...action.payload.previousFilters,
        }
      }
      return temp;
    case FILTER_ACTIONS.REMOVE_ONE:
      if (!action.payload) return state;
      // Well. Here we are. _gestures vaguely_ Hot mess town.
      const tempState = {...state};
      const filterSectionKey = Object.keys(action.payload)[0] as keyof FilterState;
      const target = action.payload[filterSectionKey] as string;
      delete (tempState[filterSectionKey] as FilterNodeData | BasicObject<any>)[target];
      return {
        ...tempState
      };
    case FILTER_ACTIONS.TOGGLE_FILTER_MENU:
      return {
        ...state,
        show: !state.show
      }
    default:
      return state;
  }
}
