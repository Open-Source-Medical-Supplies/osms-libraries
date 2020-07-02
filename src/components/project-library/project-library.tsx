import React, { useEffect, useState } from 'react';
import { CategorySupply } from '../../classes/category-supply.class';
import { MaterialType } from '../../classes/material.class';
import { Project } from '../../classes/project.class';
import { fetchData } from '../../services/app.service';
import { BasicObject } from '../../types/shared.type';
import CardContainer from "../../shared/components/card-container/card-container";
import DetailWindow from "../../shared/components/detail-window/detail-window";
import ProjectFullCard from './project-library.full-card';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/root.reducer";
import FilterMenu from "../../shared/components/filter-menu/filter-menu";

const StateDefault: {
  _records: [], // immutable
  records: [],
  selected: undefined | Project,
  visible: false,
  categories: BasicObject<CategorySupply>,
  materials: BasicObject<MaterialType[]>,
  selectedMaterials: MaterialType[]
} = {
_records: [], // 'immutable'
records: [],
selected: undefined,
visible: false,
categories: {},
materials: {},
selectedMaterials: []
};

const ProjectLibrary = () => {let [state, baseSetState] = useState(StateDefault);
  const isMobile = useSelector((state: RootState) => state.checkMobile);
  const setState = (props: Partial<typeof StateDefault>) => baseSetState({...state, ...props});
    
  useEffect(() => {
    (async() => {
      fetchData(
        ['getProjects', 'getBoM'],
        'Base ID',
        'category',
        setState
      );
    })()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  const hide = () => setState({selected: undefined, visible: false});

  useEffect(() => {
    if (!state.selected) {
     return;
    }
    const selectedMaterials = state.materials[state.selected.name] || [];
    setState({selectedMaterials});
  }, [state.selected]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{display: 'flex'}}>
     <div id='app__filter-menu' style={{flex: 1, marginRight: '0.5rem'}}>
       <FilterMenu state={state} setState={setState}/>
     </div>
     <div id='app__card-container' style={{display: 'flex', flex: state.visible ? 2 : 4}}>
       <CardContainer
        isMobile={isMobile}
        records={state.records}
        cardChange={setState}
        selected={state.selected as Project} />
     </div>
     <div id='app__detail-window-container' style={{display: 'flex', flex: state.visible ? 2 : 0}}>
       <DetailWindow visible={state.visible} onHide={hide} className='p-sidebar-md'>
         <ProjectFullCard selected={state.selected as Project} materials={state.selectedMaterials}/>
       </DetailWindow>
     </div>
    </div>
    );
}

export default ProjectLibrary;