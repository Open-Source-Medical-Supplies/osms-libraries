import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import React, { useCallback, useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { useTypedSelector } from "../../../redux/root.reducer";
import { CategoryInfo } from "../../classes/category-info.class";
import { TABLE_MAPPING } from "../../constants/google-bucket.constants";
import { FilterState } from "../../types/filter.type";
import { CategoryComparator, createUUID } from "../../utility/general.utility";
import { getParam, PARAMS } from "../../utility/param-handling";
import AttributesList from "./attributes-list";
import CategoriesList from "./categories-list";
import ClearFilters from "./clear-filers";
import { filterBy, setFilterParams } from "./filter-menu.utilities";
import { FilterSearchBar } from "./filter-search-bar";
import "./_filter-menu.scss";

/* eslint-disable react-hooks/exhaustive-deps */

const catCompare = new CategoryComparator();

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
  isFiltering: false,
  showMobileFilters: false,
};

const FilterMenu = ({
  state,
  setState,
}: {
  state: any;
  setState: Function;
}) => {
  const {
    isMobile,
    tables,
   } = useTypedSelector(({
    env,
    tables,
  }) => ({
    isMobile: env.isMobile,
    tables,
  }), shallowEqual);
  
  const { _records, records } = state;
  const [filterState, baseSetFilterState] = useState(FilterStateDefault);
  const setFilterState: SetFilterFn = (props: Partial<FilterState>) => {
    const update = {
      ...props,
      previousFilters: {
        ...filterState.previousFilters,
        ...props.previousFilters,
      },
    };
    baseSetFilterState({ ...filterState, ...update });
  };

  const doFilter = useCallback(() => {
    const filteredRecords = filterBy(filterState, _records, records);
    setFilterState({ isFiltering: _records.length > filteredRecords.length })
    setState({ records: filteredRecords }, true); // when loading from a param, had a race condition. Kinda hacky
  }, [filterState, records]);

  // load menu
  useEffect(() => {
    if (tables.completed) {
      const params = getParam(PARAMS.FILTERSTATE) as Partial<FilterState> || {};
      setFilterState({
        loaded: true,
        categories: tables.loaded[TABLE_MAPPING.CategorySupply] as CategoryInfo[],
        ...tables.loaded[TABLE_MAPPING.FilterMenu],
        ...params
      });
    }
  }, [tables.completed]);

  const nodeFiltersBool = Object.keys(filterState.nodeFilters).length;

  const catFilterBool = catCompare.compareKeys(
    filterState.categoriesFilters,
    filterState.previousFilters.categoriesFilters || {}
  ) ? createUUID() : false;

  useEffect(() => doFilter(), [_records])
  
  // filter-changes
  useEffect(() => {
    if (!filterState.loaded) return;
    setFilterParams(filterState)
    doFilter();
  }, [
    catFilterBool,
    nodeFiltersBool,
    filterState.searchBar,
    filterState.nodeFilters,
    filterState.categoriesFilters,
  ]);

  const Filters = (
    <React.Fragment>
      <CategoriesList
        categories={filterState.categories}
        categoriesFilters={filterState.categoriesFilters}
        setFilterState={setFilterState}
      />
      <div className="mb-1"></div>
      <AttributesList
        nodes={filterState.nodes}
        nodeFilters={filterState.nodeFilters}
        setFilterState={setFilterState}
      />
    </React.Fragment>
  );

  const DesktopFormat = (
    <div>
      <div className="search-bar-wrapper">
        <FilterSearchBar
          searchBarText={filterState.searchBar}
          setFilterState={setFilterState}
        />
        <ClearFilters
          setFilterState={setFilterState}
          isFiltering={filterState.isFiltering}
        />
      </div>
      <div className="mb-1"></div>
      {Filters}
    </div>
  );

  // MOBILE
  const showFilterSidebar = () => setFilterState({ showMobileFilters: true });
  const hideSidebar = () => setFilterState({ showMobileFilters: false });
  const OpenMobileFitlers = () => (
    <Button
      style={{ marginRight: "0.5rem" }}
      className="mobile-button__square"
      onClick={showFilterSidebar}
      icon="pi pi-bars"
    ></Button>
  );

  const MobileFormat = (
    <React.Fragment>
      <div className="search-bar-wrapper sticky-top-0">
        <OpenMobileFitlers />
        <FilterSearchBar
          className="mobile-search-bar"
          searchBarText={filterState.searchBar}
          setFilterState={setFilterState}
        />
        <ClearFilters
          className="mobile-button__square"
          setFilterState={setFilterState}
          isFiltering={filterState.isFiltering}
        />
      </div>
      <Sidebar
        position="left"
        fullScreen={true}
        visible={filterState.showMobileFilters}
        onHide={hideSidebar}
      >
        <div className="mb-3-5"></div>
        {Filters}
      </Sidebar>
    </React.Fragment>
  );

  return isMobile ? MobileFormat : DesktopFormat;
};

export default FilterMenu;
