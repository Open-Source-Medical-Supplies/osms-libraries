export interface FilterState {
  nodes: [], // attributes
  flatNodes: {},
  nodeFilters: PrimeAttr,
  categories: [],
  categoriesFilters: {},
  filters: {},
  searchBar: '',
  previousFilters: {
    nodeFilters?: {},
    categoriesFilters?: {},
    searchBar?: ''
  },
  isFiltering: boolean;
};

export interface PrimeAttr {
  [key: string]: {
    checked: boolean;
    partialChecked: boolean
  }
}