import { Dispatch } from "react";
import { Action } from "redux";
import { FILTER_ACTIONS } from "../shared/constants/filter.constants";
import { FilterNodeData } from "../shared/types/filter-node.type";
import { FilterState, FilterDatum } from "../shared/types/filter.type";
import { BasicObject } from "../shared/types/shared.type";
import { PARAMS, removeParam } from "../shared/utility/param-handling";

export interface FilterAction extends Action<FILTER_ACTIONS> {
  payload?: Partial<FilterState>;
}

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
        isFiltering: true,
      };
    case FILTER_ACTIONS.STOP_FILTERING:
      return {
        ...state,
        isFiltering: false,
      };
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
        isFiltering: false,
      };
    case FILTER_ACTIONS.SET_FILTER:
      if (!action?.payload) return state;
      const temp = {
        ...state,
        ...action.payload,
        previousFilters: {
          ...state.previousFilters,
          ...action.payload.previousFilters,
        },
      };
      return temp;
    case FILTER_ACTIONS.REMOVE_ONE:
      // Well. Here we are. _gestures vaguely_ Hot mess town.
      if (!action.payload) return state;
      // clone state-obj to update
      const tempState = { ...state };
      // grab primary-obj state key, e.g. 'nodeFilters', 'categoryFilters'
      const filterSectionKey = Object.keys(action.payload)[0] as keyof FilterState;
      // grab the target-child key within the primary-obj
      const target = action.payload[filterSectionKey] as string;
      const targetContainer = tempState[filterSectionKey] as FilterNodeData | BasicObject<any>;
      // if the target is from nodeFilters, check for its parent
      const nodeData = state.flatNodes && state.flatNodes[target];
      const parentKey = nodeData && nodeData.parentKey;
      // if the target is from nodeFilters & has a parent (vs being the parent)
      if (nodeData && parentKey) {
        const parentActive = !!state.nodeFilters[parentKey];
        const childList: FilterDatum[] | undefined = state.nodes.find(
          (node) => node.key === parentKey
        )?.children;
        const activeChildrenCount = (
          childList && childList.reduce((acc, child) => {
            acc += +!!(child.key && state.nodeFilters[child.key]);
            return acc;
          }, 0)
         ) || 0;
        const onlyActiveChild = activeChildrenCount === 1;
        if (parentActive && onlyActiveChild) {
          /**
           * tldr if the target is a child of a node parent,
           * and the only active one,
           * delete the whole parent
          */
          delete targetContainer[parentKey]
        }
      } else if (nodeData && !parentKey) {
        // is node parent
        const childList: FilterDatum[] | undefined = state.nodes.find(
          (node) => node.key === target
        )?.children;
        childList?.forEach(child => child.key && delete targetContainer[child.key]);
      }
      
      // delete the target/child from the cloned state-obj
      if (targetContainer) {
        delete targetContainer[target];
      }

      return {
        ...tempState,
      };
    case FILTER_ACTIONS.SHOW_MENU:
      return {
        ...state,
        show: true
      }
    case FILTER_ACTIONS.HIDE_MENU:
      return {
        ...state,
        show: false
      }
    case FILTER_ACTIONS.TOGGLE_FILTER_MENU:
      return {
        ...state,
        show: !state.show,
      };
    default:
      return state;
  }
};
