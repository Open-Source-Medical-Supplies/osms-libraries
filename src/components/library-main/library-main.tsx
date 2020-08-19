import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { useTypedSelector } from "../../redux/root.reducer";
import { CategorySupply } from "../../shared/classes/category-supply.class";
import { Material } from "../../shared/classes/material.class";
import { Project } from "../../shared/classes/project.class";
import CardContainer from "../../shared/components/card-container/card-container";
import FilterMenu from "../../shared/components/filter-menu/filter-menu";
import Loading from "../../shared/components/loading";
import { TABLE_MAPPING } from "../../shared/constants/general.constants";
import { SELECTED_ACTIONS } from "../../shared/constants/selected.constants";
import { SelectAction } from "../../shared/types/selected.type";
import { BasicObject } from "../../shared/types/shared.type";
import { Sidebar } from "primereact/sidebar";
import ProjectFullCard from "../project-library/project-library.full-card";
import DetailWindow from "../../shared/components/detail-window/detail-window";
import { getParam, PARAMS } from "../../shared/utility/param-handling";
import ActiveLib from "../../shared/types/lib.enum";
import CategoryLibFullCard from "../category-library/category-library.full-card";
import FullCard from "./full-card";

const StateDefault: {
  _records: Project[]; // immutable
  records: Project[];
  categories: BasicObject<CategorySupply>;
  materials: BasicObject<Material[]>;
  selectedMaterials: Material[];
} = {
  _records: [], // 'immutable'
  records: [],
  categories: {},
  materials: {},
  selectedMaterials: [],
};

type PartialState = Partial<typeof StateDefault>;

const LibraryMain = () => {
  const dispatch = useDispatch();
  const lib = getParam<ActiveLib>(PARAMS.LIBRARY);

  const { isMobile, tables, selected } = useTypedSelector(
    ({ env, tables, selected }) => ({
      isMobile: env.isMobile,
      tables,
      selected,
    }),
    shallowEqual
  );

  let [state, baseSetState] = useState(StateDefault);
  const setState = (props: PartialState, async = false) => {
    const updateState = () => baseSetState(() => ({ ...state, ...props }));
    async ? setTimeout(updateState) : updateState();
  };

  const hide = () =>
    dispatch<SelectAction>({
      type: SELECTED_ACTIONS.CLEAR,
    });

  useEffect(() => {
    if (tables.completed) {
      setState({
        records: tables.loaded[TABLE_MAPPING.Project] as Project[],
        _records: tables.loaded[TABLE_MAPPING.Project] as Project[],
      });
      dispatch<SelectAction>({
        type: SELECTED_ACTIONS.CHECK,
        dataSet: tables.loaded[TABLE_MAPPING.Project] as Project[],
        supportingDataSet: tables.loaded,
      });
    }
  }, [tables.completed]); // eslint-disable-line react-hooks/exhaustive-deps

  const Selected = isMobile ? (
    <Sidebar
      position="right"
      fullScreen={true}
      visible={!!selected.data}
      onHide={hide}
    >
      <FullCard lib={lib} />
    </Sidebar>
  ) : (
    <DetailWindow
      visible={!!selected.data}
      onHide={hide}
      className="p-sidebar-md"
    >
      <FullCard lib={lib} />
    </DetailWindow>
  );

  return (
    <div className="library-main-container">
      <FilterMenu state={state} setState={setState} />
      <Loading loading={!tables.completed}>
        <CardContainer
          isMobile={isMobile}
          records={state.records}
          selected={selected.data as Project}
        />
      </Loading>
      {Selected}
    </div>
  );
};
export default LibraryMain;
