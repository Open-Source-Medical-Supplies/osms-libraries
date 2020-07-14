import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/root.reducer';
import { parseCategories, parseFilterMenu } from '../../../services/filter-menu.service';
import { CategoryComparator, createUUID } from '../../utility/general.utility';
import AttributesList from './attributes-list';
import CategoriesList from './categories-list';
import ClearFilters from './clear-filers';
import { FilterState } from './filter-menu.interface';
import { filterBy } from './filter-menu.utilities';
import { FilterSearchBar } from './filter-search-bar';
import './_filter-menu.scss';

/* eslint-disable react-hooks/exhaustive-deps */

const catCompare = new CategoryComparator();

export type SetFilterFn = (props: Partial<FilterState>) => void;

const FilterStateDefault: FilterState = {
  nodes: [], // attributes
  flatNodes: {},
  nodeFilters: {},
  categories: [],
  categoriesFilters: {},
  filters: {},
  searchBar: '',
  previousFilters: {
    nodeFilters: {},
    categoriesFilters: {},
    searchBar: ''
  },
  isFiltering: false,
  showMobileFilters: false
};

const FilterMenu = ({state, setState}: {state: any, setState: Function}) => {
  const isMobile = useSelector<RootState, boolean>(({env}) => env.isMobile);
  
  const {_records, records } = state;
  const [filterState, baseSetFilterState] = useState(FilterStateDefault);
  const setFilterState: SetFilterFn = (props: Partial<FilterState>) => {
    const update = {
      ...props,
      previousFilters: {
        ...filterState.previousFilters,
        ...props.previousFilters
      }
    };
    baseSetFilterState({...filterState, ...update});
  };
  const setSelection = (event: any) => {
    setFilterState({
      nodeFilters: event.value,
      previousFilters: {
        nodeFilters: filterState.nodeFilters
      }
    });
  };
  
  // load menu
  useEffect(() => {
    (async function fetch () {
      Promise.all([
        parseFilterMenu(),
        parseCategories()
      ]).then(
        (res: any) => {
          setFilterState({ ...res[0], ...res[1] })
        }
      );
    })()
  }, []);

  const nodeFiltersBool = Object.keys(filterState.nodeFilters).length;
  
  const catFilterBool = catCompare.compareKeys(
    filterState.categoriesFilters, filterState.previousFilters.categoriesFilters || {}
  ) ? createUUID() : false;

  // filter-changes
  useEffect(() => {
    if (
      filterState.nodeFilters || 
      filterState.categoriesFilters ||
      filterState.searchBar
    ) {
      const filteredRecords = filterBy(filterState, _records, records);
      setState({records: filteredRecords});
      setFilterState({isFiltering: _records.length > filteredRecords.length});
    }
  }, [
    catFilterBool,
    nodeFiltersBool,
    filterState.searchBar
  ]);

  const DesktopFormat = (
    <div>
      <div className='search-bar-wrapper'>
        <FilterSearchBar
          searchBarText={filterState.searchBar}
          setFilterState={setFilterState}/>
        <ClearFilters
          setFilterState={setFilterState}
          isFiltering={filterState.isFiltering}/>
      </div>
      <div className='divider-1'></div>
      <CategoriesList
        categories={filterState.categories}
        categoriesFilters={filterState.categoriesFilters}
        setFilterState={setFilterState}/>
      <div className='divider-1'></div>
      <AttributesList
        nodes={filterState.nodes}
        nodeFilters={filterState.nodeFilters}
        setSelection={setSelection}/>
    </div>
  );

  // MOBILE
  const toggleFilterMenus = () => setFilterState({
    showMobileFilters: !state.showMobileFilters
  });
  const OpenMobileFitlers = () => (
    <Button
      onClick={() => toggleFilterMenus()}
      icon='pi pi-bars'>
    </Button>
  );

  const MobileFormat = (
    <div className='search-bar-wrapper'>
      <OpenMobileFitlers />
      <FilterSearchBar
        searchBarText={filterState.searchBar}
        setFilterState={setFilterState}/>
      <ClearFilters
        setFilterState={setFilterState}
        isFiltering={filterState.isFiltering}/>
    </div>
  );

  return isMobile ? MobileFormat : DesktopFormat;
};

export default FilterMenu;