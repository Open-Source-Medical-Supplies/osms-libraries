import { Button } from "primereact/button";
import React, { useCallback, useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { useTypedSelector } from "../../../redux/root.reducer";
import { CategoryInfo } from "../../classes/category-info.class";
import { TABLE_MAPPING } from "../../constants/general.constants";
import { FilterState } from "../../types/filter.type";
import { CategoryComparator, createUUID } from "../../utility/general.utility";
import { getParam, PARAMS } from "../../utility/param-handling";
import DetailWindow from "../detail-window/detail-window";
import AttributesList from "./attributes-list";
import CategoriesList from "./categories-list";
import ClearFilters from "./clear-filers";
import { filterBy, setFilterParams } from "./filter-menu.utilities";
import { FilterSearchBar } from "./filter-search-bar";
import "./_filter-menu.scss";
import LibrarySelector from "../library-selector/library-selector";
import { Sidebar } from "primereact/sidebar";

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
  show: false,
};

const FilterMenu = ({
  state,
  setState,
}: {
  state: any;
  setState: Function;
}) => {
  const { isMobile, tables } = useTypedSelector(
    ({ env, tables }) => ({
      isMobile: env.isMobile,
      tables,
    }),
    shallowEqual
  );

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
    setFilterState({ isFiltering: _records.length > filteredRecords.length });
    setState({ records: filteredRecords }, true); // when loading from a param, had a race condition. Kinda hacky
  }, [filterState, records]);

  // load menu
  useEffect(() => {
    if (tables.completed) {
      const params =
        (getParam(PARAMS.FILTERSTATE) as Partial<FilterState>) || {};
      setFilterState({
        loaded: true,
        categories: tables.loaded[
          TABLE_MAPPING.CategorySupply
        ] as CategoryInfo[],
        ...tables.loaded[TABLE_MAPPING.FilterMenu],
        ...params,
      });
    }
  }, [tables.completed]);

  const nodeFiltersBool = Object.keys(filterState.nodeFilters).length;

  const catFilterBool = catCompare.compareKeys(
    filterState.categoriesFilters,
    filterState.previousFilters.categoriesFilters || {}
  )
    ? createUUID()
    : false;

  useEffect(() => doFilter(), [_records]);

  // filter-changes
  useEffect(() => {
    if (!filterState.loaded) return;
    setFilterParams(filterState);
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

  const toggleSidebar = () => setFilterState({ show: !filterState.show });

  const SideMenu = isMobile ? (
    <Sidebar
      onHide={toggleSidebar}
      position="left"
      visible={filterState.show}
      showCloseIcon={true}
      fullScreen={true}
    >
      {Filters}
      <div className="mb-3-5"></div>
    </Sidebar>
  ) : (
    <DetailWindow
      position="left"
      visible={filterState.show}
      showCloseIcon={true}
      className="p-sidebar-md"
    >
      {Filters}
    </DetailWindow>
  );

  const FilterMenuContainer = (
    <div className={"grid-area" + (isMobile ? "-mobile" : "")}>
      {SideMenu}
      <Button
        style={{ marginRight: "0.5rem" }}
        className="mobile-button__square filter-menu__grid-button"
        onClick={toggleSidebar}
        icon={"pi pi-" + (filterState.show ? "times" : "bars")}
      />
      <LibrarySelector className="filter-menu__grid-select" />
      <FilterSearchBar
        className="mobile-search-bar filter-menu__grid-search"
        searchBarText={filterState.searchBar}
        setFilterState={setFilterState}
      />
      <ClearFilters
        className="mobile-button__square filter-menu__grid-button"
        setFilterState={setFilterState}
        isFiltering={filterState.isFiltering}
      />
    </div>
  );

  return FilterMenuContainer;
};

export default FilterMenu;
