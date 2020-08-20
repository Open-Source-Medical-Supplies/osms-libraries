import { CategoryInfo } from "../classes/category-info.class";
import { mapFilterData } from "../components/filter-menu/filter-menu.utilities";
import { FilterNodeData } from "./filter-node.type";
import { BasicObject } from "./shared.type";

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
  categoriesFilters: BasicObject<any>;
  filters: BasicObject<any>;
  searchBar: string;
  previousFilters: PreviousFilterState;
  show: boolean;
  isFiltering: boolean;
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