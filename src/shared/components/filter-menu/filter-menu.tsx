import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/root.reducer";
import {
  parseCategories,
  parseFilterMenu,
} from "../../../services/filter-menu.service";
import { CategoryComparator, createUUID } from "../../utility/general.utility";
import AttributesList from "./attributes-list";
import CategoriesList from "./categories-list";
import ClearFilters from "./clear-filers";
import { FilterState } from "./filter-menu.interface";
import { filterBy } from "./filter-menu.utilities";
import { FilterSearchBar } from "./filter-search-bar";
import { Sidebar } from "primereact/sidebar";
import "./_filter-menu.scss";
import { updateQueryParam } from "../../utility/param-handling";

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
  const { isMobile, lib } = useSelector<RootState, any>(({ env, lib }) => ({
    isMobile: env.isMobile,
    lib
  }));

  const setQueryParam = updateQueryParam(lib);

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
  const setSelection = (event: any) => {
    setFilterState({
      nodeFilters: event.value,
      previousFilters: {
        nodeFilters: filterState.nodeFilters,
      },
    });
  };

  // load menu
  useEffect(() => {
    (async function fetch() {
      Promise.all([parseFilterMenu(), parseCategories()]).then((res: any) => {
        setFilterState({ ...res[0], ...res[1] });
      });
    })();
  }, []);

  const nodeFiltersBool = Object.keys(filterState.nodeFilters).length;

  const catFilterBool = catCompare.compareKeys(
    filterState.categoriesFilters,
    filterState.previousFilters.categoriesFilters || {}
  )
    ? createUUID()
    : false;

  // filter-changes
  useEffect(() => {
    if (
      filterState.nodeFilters ||
      filterState.categoriesFilters ||
      filterState.searchBar
    ) {
      const filteredRecords = filterBy(filterState, _records, records);

      setState({ records: filteredRecords });
      setFilterState({ isFiltering: _records.length > filteredRecords.length });
    }
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
        setSelection={setSelection}
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
