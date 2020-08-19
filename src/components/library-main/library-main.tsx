import { Sidebar } from "primereact/sidebar";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { useTypedSelector } from "../../redux/root.reducer";
import { CategoryInfo } from "../../shared/classes/category-info.class";
import { CategorySupply } from "../../shared/classes/category-supply.class";
import { Material } from "../../shared/classes/material.class";
import { Project } from "../../shared/classes/project.class";
import CardContainer from "../../shared/components/card-container/card-container";
import FilterMenu from "../../shared/components/filter-menu/filter-menu";
import Loading from "../../shared/components/loading";
import { TABLE_MAPPING } from "../../shared/constants/general.constants";
import { SELECTED_ACTIONS } from "../../shared/constants/selected.constants";
import ActiveLib, { ActiveLibToClassName } from "../../shared/types/lib.enum";
import { SelectAction } from "../../shared/types/selected.type";
import { BasicObject } from "../../shared/types/shared.type";
import FullCard from "./full-card";
import './_library-main.scss'
import classNames from 'classnames';

type PartialState = Partial<typeof stateDefault>;

interface StateDefault {
  _records: Project[] | CategoryInfo[];
  records: Project[] | CategoryInfo[];
  categories: BasicObject<CategorySupply>;
  materials: BasicObject<Material[]>;
  selectedMaterials: Material[];
  filterMenuViz: Boolean;
}

const stateDefault: StateDefault = {
  _records: [],
  records: [],
  categories: {},
  materials: {},
  selectedMaterials: [],
  filterMenuViz: false
};

const LibraryMain = () => {
  const dispatch = useDispatch();
  const { isMobile, tables, lib, selected } = useTypedSelector(
    ({ env, tables, lib, selected }) => ({
      isMobile: env.isMobile,
      tables, lib,
      selected,
    }),
    shallowEqual
  );

  let [state, baseSetState] = useState(stateDefault);
  const setState = (props: PartialState, async = false) => {
    const updateState = () => baseSetState(() => ({ ...state, ...props }));
    async ? setTimeout(updateState) : updateState();
  };

  const hide = () =>
    dispatch<SelectAction>({
      type: SELECTED_ACTIONS.CLEAR_SELECTED,
    });

  useEffect(() => {
    if (tables.completed) {
      const focus = tables.loaded[TABLE_MAPPING[ActiveLibToClassName[lib]]] as Project[] | CategoryInfo[];
      setState({ records: focus, _records: focus });
      dispatch<SelectAction>({
        type: SELECTED_ACTIONS.CHECK_SELECTED,
        dataSet: focus,
        supportingDataSet: tables.loaded,
      });
    }
  }, [tables.completed, lib]); // eslint-disable-line react-hooks/exhaustive-deps

  const libContainerClasses = classNames(
    "library-main-container",
    {
      "library-main-container__grid__menu-closed": !state.filterMenuViz,
      "library-main-container__grid__menu-open": state.filterMenuViz
    }
  );

  return (
    <div className={libContainerClasses}>
      <FilterMenu
        disabled={lib === ActiveLib.CATEGORY}
        _data={state._records as Project[]}
        data={state.records as Project[]}
        reset={}
        onFilter={(filteredRecords) => setState({ records: filteredRecords }, true)}
        onMenuVizChange={(menuViz) => setState({filterMenuViz: menuViz})}/>
      <Loading loading={!tables.completed}>
        <CardContainer
          isMobile={isMobile}
          records={state.records}
          selected={selected.data }
        />
      </Loading>
      <Sidebar
        position="right"
        fullScreen={isMobile}
        visible={!!selected.data}
        onHide={hide}
        className={isMobile ? '' : 'p-sidebar-lg'}
      >
      <FullCard lib={lib} />
    </Sidebar>
    </div>
  );
};
export default LibraryMain;
