import { Action } from 'redux';
import { Project } from '../shared/classes/project.class';
import { filterBy } from '../shared/components/filter-menu/filter-menu.utilities';
import { FILTER_ACTIONS } from '../shared/constants/filter.constants';
import { FilterState } from '../shared/types/filter.type';
import { PARAMS, removeParam } from '../shared/utility/param-handling';
import { ACTIVE_ACTIONS } from './active.reducer';
import { RootState } from './root.reducer';

export interface FilterAction extends Action<FILTER_ACTIONS> {
  payload: FilterState;
};

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
};

/** usage: dispatch(filterAndUpdate()) */
export const filterAndUpdate = (
  filterState: FilterState
) => (
  // ): TypedThunkAction<FilterAction | ActiveActions> => (
  dispatch: (o: any) => Promise<any>,
  getState: () => RootState
) => {
  debugger
  const state = getState();
  const {_data, data} = state.active

  const filteredRecords = filterBy(
    filterState,
    _data as Project[],
    data as Project[]
  );

  return dispatch({
    type: FILTER_ACTIONS.SET_FILTER,
    payload: filterState
  }).then(
    () => dispatch({
      type: ACTIVE_ACTIONS.FILTER_ACTIVE,
      data: filteredRecords,
    })
  );
}

export const clearFilter = () => (
  // ): TypedThunkAction<FilterAction | ActiveActions> => (
  dispatch: (o: any) => Promise<any>,
) => {
  return dispatch({
    type: FILTER_ACTIONS.CLEAR_FILTER,
  }).then(
    () => dispatch({
      type: ACTIVE_ACTIONS.RESET_ACTIVE,
    })
  );
};

export const filterReducer = (
  state = FilterStateDefault,
  action: FilterAction
): FilterState => {
  switch (action.type) {
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
        }
      };
    case FILTER_ACTIONS.SET_FILTER:
      return {
        ...state,
        ...action.payload,
        previousFilters: {
          ...state.previousFilters,
          ...action.payload.previousFilters,
        }
      }
    default:
      return state;
  }
}
