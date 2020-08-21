import classNames from "classnames";
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
import "./_library-main.scss";
import { ActiveType } from "../../redux/lib.reducer";

type PartialState = Partial<typeof stateDefault>;

interface StateDefault {
  _records: ActiveType;
  records: ActiveType;
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
  filterMenuViz: false,
};

const LibraryMain = () => {
  const dispatch = useDispatch();
  const { isMobile, tables, lib, selected } = useTypedSelector(
    ({ env, ...libs }) => ({
      isMobile: env.isMobile,
      ...libs,
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

  // load initial tables / change on lib-change
  useEffect(() => {
    if (tables.completed) {
      const { _data, data } = lib;
      let focus: ActiveType = [];

      if (_data.length) {
        setState({ records: data, _records: _data });
      } else {
        focus = tables.loaded[
          TABLE_MAPPING[ActiveLibToClassName[lib.active]]
        ] as Project[] | CategoryInfo[];
        setState({ records: focus, _records: focus });
      }

      dispatch<SelectAction>({
        type: SELECTED_ACTIONS.CHECK_SELECTED,
        dataSet: _data.length ? _data : focus,
        supportingDataSet: tables.loaded,
      });
    }
  }, [tables.completed, lib.active]); // eslint-disable-line react-hooks/exhaustive-deps

  const libContainerClasses = classNames("library-main-container", {
    "library-main-container__grid__menu-closed": !state.filterMenuViz,
    "library-main-container__grid__menu-open": state.filterMenuViz,
  });

  return (
    <div className={libContainerClasses}>
      <FilterMenu
        disabled={lib.active === ActiveLib.CATEGORY}
        onMenuVizChange={(menuViz) => setState({ filterMenuViz: menuViz })}
      />
      <Loading loading={!tables.completed}>
        <CardContainer
          isMobile={isMobile}
          records={state.records}
          selected={selected.data}
        />
      </Loading>
      <Sidebar
        position="right"
        fullScreen={isMobile}
        visible={!!selected.data}
        onHide={hide}
        className={isMobile ? "" : "p-sidebar-lg"}
      >
        <FullCard lib={lib.active} />
      </Sidebar>
    </div>
  );
};
export default LibraryMain;
