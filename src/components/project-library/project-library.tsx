import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CategorySupply } from '../../classes/category-supply.class';
import { Material } from '../../classes/material.class';
import { Project } from '../../classes/project.class';
import { RootState } from "../../redux/root.reducer";
import { fetchData } from '../../services/app.service';
import CardContainer from "../../shared/components/card-container/card-container";
import DetailWindow from "../../shared/components/detail-window/detail-window";
import FilterMenu from "../../shared/components/filter-menu/filter-menu";
import Loading from '../../shared/components/loading';
import ActiveLib from '../../types/lib.enum';
import { BasicObject } from '../../types/shared.type';
import ProjectFullCard from './project-library.full-card';

const StateDefault: {
  _records: []; // immutable
  records: [];
  selected: undefined | Project;
  visible: false;
  categories: BasicObject<CategorySupply>;
  materials: BasicObject<Material[]>;
  selectedMaterials: Material[];
  loading: boolean;
} = {
  _records: [], // 'immutable'
  records: [],
  selected: undefined,
  visible: false,
  categories: {},
  materials: {},
  selectedMaterials: [],
  loading: true
};

const ProjectLibrary: React.FC = () => {
  const dispatch = useDispatch();
  dispatch({type: ActiveLib.PROJECT});

  let [state, baseSetState] = useState(StateDefault);
  const isMobile = useSelector<RootState, boolean>(({env}) => env.isMobile);
  const setState = (props: Partial<typeof StateDefault>) => baseSetState({...state, ...props});
  const setLoadingState = (d: Partial<typeof StateDefault>) => setState({loading: false, ...d});
  const hide = () => setState({selected: undefined, visible: false});

  useEffect(() => {
    (async() => {
      fetchData<Project, typeof setLoadingState>(
        ['getProjects', 'getBoM'],
        'displayName',
        ActiveLib.PROJECT,
        setLoadingState
      );
    })()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!state.selected) {
     return;
    }
    const selectedMaterials = state.materials[state.selected.displayName] || [];
    setState({selectedMaterials});
  }, [state.selected]); // eslint-disable-line react-hooks/exhaustive-deps

  const DesktopFormat = (
    <React.Fragment>
      <div id='app__filter-menu' style={{flex: 1, marginRight: '0.5rem'}}>
        <FilterMenu state={state} setState={setState}/>
      </div>
      <div id='app__card-container' style={{display: 'flex', flex: state.visible ? 2 : 4}}>
          <Loading loading={state.loading} >
            <CardContainer
              isMobile={isMobile}
              records={state.records}
              cardChange={setState}
              selected={state.selected as Project} />
          </Loading>
      </div>
    </React.Fragment>
  );

  const MobileFormat = (
    <div className='flex-column'>
      <FilterMenu state={state} setState={setState}/>
      <Loading loading={state.loading} >
        <CardContainer
          isMobile={isMobile}
          records={state.records}
          cardChange={setState}
          selected={state.selected as Project} />
      </Loading>
    </div>
  );

  return (
    <div id='project-library' className='library-container'>
      {isMobile ? MobileFormat : DesktopFormat}
     <div id='app__detail-window-container' style={{display: 'flex', flex: state.visible ? 2 : 0}}>
       <DetailWindow visible={state.visible} onHide={hide} className='p-sidebar-md'>
         <ProjectFullCard selected={state.selected as Project} materials={state.selectedMaterials}/>
       </DetailWindow>
     </div>
    </div>
    );
}

export default ProjectLibrary;