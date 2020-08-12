import { Sidebar } from 'primereact/sidebar';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { CategorySupply } from '../../classes/category-supply.class';
import { Material } from '../../classes/material.class';
import { Project } from '../../classes/project.class';
import { useTypedSelector } from "../../redux/root.reducer";
import { SelectAction, SELECTED_ACTIONS } from '../../redux/selected.reducer';
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
  visible: boolean;
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

type PartialState = Partial<typeof StateDefault>;

const ProjectLibrary: React.FC = () => {
  const dispatch = useDispatch();
  dispatch({type: ActiveLib.PROJECT});

  const isMobile = useTypedSelector(({env}) => env.isMobile);

  let [state, baseSetState] = useState(StateDefault);
  const setState = (props: PartialState, async = false) => {
    const updateState = () => baseSetState(() => ({...state, ...props}));
    async ? setTimeout(updateState) : updateState();
  };

  const setLoadingState = (d: PartialState) => setState({loading: false, ...d});
  const hide = () => dispatch<SelectAction>({
    type: SELECTED_ACTIONS.CLEAR
  });

  useEffect(() => {
    (async() => {
      fetchData<Project, typeof setLoadingState>(
        ['getProjects', 'getBoM'],
        'displayName',
        setLoadingState
      );
    })()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!state.selected) {return;}
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
      <div id='app__detail-window-container' style={{display: 'flex', flex: state.visible ? 2 : 0}}>
       <DetailWindow visible={state.visible} onHide={hide} className='p-sidebar-md'>
         <ProjectFullCard selected={state.selected as Project} materials={state.selectedMaterials}/>
       </DetailWindow>
     </div>
    </React.Fragment>
  );

  const MobileFormat = (
    <React.Fragment>
      <div className='flex-column' style={{width: '100%'}}>
        <FilterMenu state={state} setState={setState}/>
        <Loading loading={state.loading} >
          <CardContainer
            isMobile={isMobile}
            records={state.records}
            cardChange={setState}
            selected={state.selected as Project} />
        </Loading>
      </div>
    <Sidebar
      position='right'
      fullScreen={true}
      visible={state.visible}
      onHide={hide}>
      <ProjectFullCard selected={state.selected as Project} materials={state.selectedMaterials}/>
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