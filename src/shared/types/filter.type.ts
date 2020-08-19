import { CategoryInfo } from "../classes/category-info.class";
import { mapFilterData } from "../components/filter-menu/filter-menu.utilities";
import { FilterNodeData } from "./filter-node.type";

export interface PreviousFilterState {
  nodeFilters?: FilterNodeData;
  categoriesFilters?: {};
  searchBar?: string;
}

export interface FilterState {
  loaded: boolean;
  nodes: ReturnType<typeof mapFilterData>['nodes']
  flatNodes: ReturnType<typeof mapFilterData>['flatNodes'];
  nodeFilters: FilterNodeData;
  categories: CategoryInfo[];
  categoriesFilters: {};
  filters: {};
  searchBar: string;
  previousFilters: PreviousFilterState;
  show: boolean;
};

export interface FilterDatum {
  key?: string;
  parentKey?: string;
  icon?: string;
  children?: FilterDatum[];
}

export interface Filters {
  categories: {};
  attributes: string[];
  searchBar: string;
  previousFilters: FilterState["previousFilters"];
};