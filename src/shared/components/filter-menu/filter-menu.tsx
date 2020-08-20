import classNames from 'classnames';
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { clearFilter, filterAndUpdate, DispatchFilterAction } from '../../../redux/filter.reducer';
import { useTypedSelector } from "../../../redux/root.reducer";
import { CategoryInfo } from "../../classes/category-info.class";
import { TABLE_MAPPING } from "../../constants/general.constants";
import { FilterState } from "../../types/filter.type";
import { CategoryComparator, createUUID } from "../../utility/general.utility";
import { getParam, PARAMS } from "../../utility/param-handling";
import DetailWindow from "../detail-window/detail-window";
import LibrarySelector from "../library-selector/library-selector";
import AttributesList from "./attributes-list";
import CategoriesList from "./categories-list";
import { setFilterParams } from "./filter-menu.utilities";
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
  show: false,
  isFiltering: false
};

const FilterMenu = ({
  disabled = false,
  onMenuVizChange,
}: {
  disabled: boolean;
  onMenuVizChange?: (viz: boolean) => void;
}) => {
  const { isMobile, tables } = useTypedSelector(
    ({ env, tables }) => ({
      isMobile: env.isMobile,
      tables,
    }),
    shallowEqual
  );
  const dispatch = useDispatch<DispatchFilterAction>();

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
  const toggleSidebar = () => {
    const setTo = !filterState.show;
    setFilterState({ show: setTo });
    if (onMenuVizChange) {
      onMenuVizChange(setTo);
    }
  };

  const clearFilters = () => dispatch(clearFilter());
  const doFilter = () => dispatch(filterAndUpdate(filterState));

  // load menu
  useEffect(() => {
    if (tables.completed) {
      const params = getParam<Partial<FilterState>>(PARAMS.FILTERSTATE) || {};
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

  useEffect(() => { doFilter() }, []);

  // filter-changes
  useEffect(() => {
    if (!filterState.loaded) return;
    setFilterParams(filterState);
    setFilterState({isFiltering: true});
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
      <CategoriesList />
      <div className="mb-1"></div>
      <AttributesList
        nodes={filterState.nodes}
        nodeFilters={filterState.nodeFilters}
        setFilterState={setFilterState}
      />
    </React.Fragment>
  );

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
      showCloseIcon={false}
      className="p-sidebar-md"
    >
      {Filters}
    </DetailWindow>
  );

  const MenuButton = () => {
    const icon = "pi pi-" + (disabled || filterState.show ? "times" : "bars");
    const className = classNames(
      "mobile-button__square filter-menu__grid-button disabled-button",
      {
        'disabled-button__true': disabled
      }
    );
    return (
      <Button
        style={{marginRight: "0.5rem"}}
        className={className}
        onClick={disabled ? () => null : toggleSidebar}
        icon={icon}
      />
    );
  };

  const ClearFilters = () => (
    <Button
      className="mobile-button__square filter-menu__grid-button"
      icon='pi pi-undo'
      disabled={filterState.isFiltering}
      onClick={clearFilters} />
  );

  const className = "filter-menu-container grid-area" + (isMobile ? "-mobile" : "");
  const Header = (
    <div className={className}>
      <MenuButton />
      <LibrarySelector className="filter-menu__grid-select" />
      <FilterSearchBar className="mobile-search-bar filter-menu__grid-search"/>
      <ClearFilters />
    </div>
  );

  return (
    <React.Fragment>
      {Header}
      {disabled ? null : SideMenu}
    </React.Fragment>
  );
};

export default FilterMenu;
