import { Sidebar } from 'primereact/sidebar';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch } from "react-redux";
import { useTypedSelector } from "../../redux/root.reducer";
import { CategorySupply } from '../../shared/classes/category-supply.class';
import { Material } from '../../shared/classes/material.class';
import { Project } from '../../shared/classes/project.class';
import CardContainer from "../../shared/components/card-container/card-container";
import DetailWindow from "../../shared/components/detail-window/detail-window";
import Loading from '../../shared/components/loading';
import { TABLE_MAPPING } from '../../shared/constants/general.constants';
import { SELECTED_ACTIONS } from '../../shared/constants/selected.constants';
import ActiveLib from '../../shared/types/lib.enum';
import { SelectAction } from '../../shared/types/selected.type';
import { BasicObject } from '../../shared/types/shared.type';
import { PARAMS, setQueryParam } from '../../shared/utility/param-handling';
import ProjectFullCard from './project-library.full-card';

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

const ProjectLibrary: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setQueryParam({key: PARAMS.LIBRARY, val: ActiveLib.PROJECT});
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const {
    isMobile,
    tables,
    selected
   } = useTypedSelector(({
    env,
    tables,
    selected
  }) => ({
    isMobile: env.isMobile,
    tables,
    selected
  }), shallowEqual);

  let [state, baseSetState] = useState(StateDefault);
  const setState = (props: PartialState, async = false) => {
    const updateState = () => baseSetState(() => ({...state, ...props}));
    async ? setTimeout(updateState) : updateState();
  };

  const hide = () => dispatch<SelectAction>({
    type: SELECTED_ACTIONS.CLEAR
  });
  // ['getProjects', 'getBoM'],

  useEffect(() => {
    if (tables.completed) {
      setState({
        records: tables.loaded[TABLE_MAPPING.Project] as Project[],
        _records: tables.loaded[TABLE_MAPPING.Project] as Project[],
      })
      dispatch<SelectAction>({
        type: SELECTED_ACTIONS.CHECK,
        dataSet: tables.loaded[TABLE_MAPPING.Project] as Project[],
        supportingDataSet: tables.loaded
      });
    }
  }, [tables.completed]); // eslint-disable-line react-hooks/exhaustive-deps

  const DesktopFormat = (
    <React.Fragment>
      <div id='app__filter-menu' style={{flex: 1, marginRight: '0.5rem'}}>
        {/* <FilterMenu state={state} setState={setState}/> */}
      </div>
      <div id='app__card-container' style={{display: 'flex', flex: !!selected.data ? 2 : 4}}>
          <Loading loading={!tables.completed} >
            <CardContainer
              isMobile={isMobile}
              records={state.records}
              selected={selected.data as Project} />
          </Loading>
      </div>
      <div id='app__detail-window-container' style={{display: 'flex', flex: !!selected.data ? 2 : 0}}>
       <DetailWindow visible={!!selected.data} onHide={hide} className='p-sidebar-md'>
         <ProjectFullCard />
       </DetailWindow>
     </div>
    </React.Fragment>
  );

  const MobileFormat = (
    <React.Fragment>
      <div className='flex-column' style={{width: '100%'}}>
        {/* <FilterMenu state={state} setState={setState}/> */}
        <Loading loading={!tables.completed} >
          <CardContainer
            isMobile={isMobile}
            records={state.records}
            selected={selected.data as Project} />
        </Loading>
      </div>
    <Sidebar
      position='right'
      fullScreen={true}
      visible={!!selected.data}
      onHide={hide}>
      <ProjectFullCard />
    </Sidebar>
  </React.Fragment>
  );

  return (
    <div id='project-library' className='library-container'>
      {isMobile ? MobileFormat : DesktopFormat}
    </div>
    );
}

export default ProjectLibrary;