import classNames from "classnames";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { clearFilter } from "../../../redux/actions/filter.action";
import { DispatchFilterAction } from "../../../redux/filter.reducer";
import { DispatchLibAction, LIB_ACTIONS } from "../../../redux/lib.reducer";
import { useTypedSelector } from "../../../redux/root.reducer";
import { CategoryInfo } from "../../classes/category-info.class";
import { Project } from "../../classes/project.class";
import { FILTER_ACTIONS } from "../../constants/filter.constants";
import { TABLE_MAPPING } from "../../constants/general.constants";
import { FilterState } from "../../types/filter.type";
import ActiveLib from "../../types/lib.enum";
import { CategoryComparator } from "../../utility/general.utility";
import { getParam, PARAMS } from "../../utility/param-handling";
import DetailWindow from "../detail-window/detail-window";
import LibrarySelector from "../library-selector/library-selector";
import AttributesList from "./attributes-list";
import CategoriesList from "./categories-list";
import { filterBy, getFilterHash, setFilterParams } from "./filter-menu.utilities";
import FilterPills from "./filter-pills";
import { FilterSearchBar } from "./filter-search-bar";
import "./_filter-menu.scss";

/* eslint-disable react-hooks/exhaustive-deps */

const catCompare = new CategoryComparator();

export type SetFilterFn = (props: Partial<FilterState>) => void;

const FilterMenu = ({ disabled = false }: { disabled: boolean }) => {
  const dispatchFilter = useDispatch<DispatchFilterAction>();
  const dispatchLib = useDispatch<DispatchLibAction>();
  const { isMobile, tables, lib, filter } = useTypedSelector(
    ({ env, tables, lib, filter }) => ({
      isMobile: env.isMobile,
      tables,
      lib,
      filter,
    }),
    shallowEqual
  );

  const toggleSidebar = () => dispatchFilter({
    type: FILTER_ACTIONS.TOGGLE_FILTER_MENU
  });

  const clearFilters = () => dispatchFilter(clearFilter());
  const doFilter = () => {
    setFilterParams(filter);
    
    const {_data, data} = lib;
    const filtered = filterBy( filter, _data as Project[], data as Project[] );

    dispatchFilter({
      type: filtered.length < lib._data.length ? 
        FILTER_ACTIONS.START_FILTERING :
        FILTER_ACTIONS.STOP_FILTERING
    });
    dispatchLib({
      type: LIB_ACTIONS.FILTER_LIB,
      data: filtered,
    });
  };

  // run on tables loaded
  useEffect(() => {
    if (tables.completed) {
      const params = getParam<Partial<FilterState>>(PARAMS.FILTERSTATE) || {};
      dispatchFilter({
        type: FILTER_ACTIONS.SET_FILTER,
        payload: {
          show: lib.active === ActiveLib.PROJECT,
          loaded: true,
          categories: tables.loaded[
            TABLE_MAPPING.CategorySupply
          ] as CategoryInfo[],
          ...tables.loaded[TABLE_MAPPING.FilterMenu],
          ...params,
        },
      });
    }
  }, [tables.completed]);

  // run on filters loaded
  useEffect(() => {
    if (!filter.loaded) return;
    doFilter();
  }, [filter.loaded]);

  // run on filter state changes
  useEffect(() => {
    if (!filter.loaded) return;
    doFilter();
  }, [getFilterHash(filter, catCompare)]);

  const Filters = (
    <React.Fragment>
      <CategoriesList />
      <div className="mb-1"></div>
      <AttributesList />
    </React.Fragment>
  );

  const SideMenu = isMobile ? (
    <Sidebar
      onHide={toggleSidebar}
      position="left"
      visible={filter.show}
      showCloseIcon={true}
      fullScreen={true}
    >
      {Filters}
      <div className="mb-3-5"></div>
    </Sidebar>
  ) : (
    <DetailWindow
      position="left"
      visible={filter.show}
      showCloseIcon={false}
      className="p-sidebar-md"
    >
      {Filters}
    </DetailWindow>
  );

  const MenuButton = () => {
    const icon = "pi pi-" + (disabled || filter.show ? "times" : "filter");
    const className = classNames(
      "mobile-button__square filter-menu__button disabled-button",
      {
        "disabled-button__true": disabled,
      }
    );
    return (
      <Button
        tooltip='Filter'
        tooltipOptions={{position: 'bottom'}}
        style={{ marginRight: "0.5rem" }}
        className={className}
        onClick={disabled ? () => null : toggleSidebar}
        icon={icon}
      />
    );
  };

  const ClearFilters = () => (
    <Button
      className="mobile-button__square filter-menu__button"
      icon="pi pi-undo"
      disabled={!filter.isFiltering}
      onClick={clearFilters}
    />
  );

  const containerClass = classNames(
    "filter-menu-container grid-area",
    { "grid-area-mobile": isMobile }
  );
  const Header = (
    <div className={containerClass}>
      <MenuButton />
      <LibrarySelector className="filter-menu__select" />
      <FilterSearchBar className="mobile-search-bar filter-menu__search" />
      <ClearFilters />
      {/* <LanguageSelect /> */}
      {
        lib.active === ActiveLib.PROJECT ?
          <FilterPills pills={[
            { 
              parent: 'nodeFilters',
              payload: filter.nodeFilters,
            }, {
              parent: 'categoriesFilters', 
              payload: filter.categoriesFilters
            }
          ]}/> :
          null
      }
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
