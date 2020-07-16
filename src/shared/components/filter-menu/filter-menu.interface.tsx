import { FilterNodes, FilterNodeData } from "../../../types/filter-node.type";

export interface PreviousFilterState {
  nodeFilters?: FilterNodeData;
  categoriesFilters?: {};
  searchBar?: string;
}

export interface FilterState {
  nodes: FilterNodes; // attributes
  flatNodes: {};
  nodeFilters: FilterNodeData;
  categories: [];
  categoriesFilters: {};
  filters: {};
  searchBar: string;
  previousFilters: PreviousFilterState;
  isFiltering: boolean;
  showMobileFilters: boolean;
};
