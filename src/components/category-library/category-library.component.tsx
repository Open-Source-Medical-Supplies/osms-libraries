import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import './shared/css/_prime.scss';
import React, { useEffect, useRef, useState } from 'react';
import { fetchData } from '../../services/app.service';
import CardContainer from './components/card-container/card-container';
import DetailWindow from './components/detail-window/detail-window';
import FullCard from "./components/detail-window/full-card";
import { SearchBar } from "./components/search-bar/search-bar";
import { MapCardToJSON } from "./service/mapCardToJSON";
import { empty } from "./shared/utilities";
import { useSelector, DefaultRootState } from "react-redux";
import { RootState } from "../../redux/reducers/root.reducer";
import { BasicObject } from '../../types/shared.type';
import { ProjectType, Project } from '../../classes/project.class';

const StateDefault: {
  _records: [], // immutable
  records: [],
  selectedCategory: undefined | ProjectType,
  visible: false,
  projectsByCategory: ReturnType<typeof Project['getCrossLinks']>,
  selectedProjects: ReturnType<typeof Project['getCrossLinks']>[]
} = {
_records: [], // immutable
records: [],
selectedCategory: undefined,
visible: false,
projectsByCategory: {},
selectedProjects: []
};

const CategoryLibrary: React.FC = () => {
  const isMobile = useSelector((state: RootState) => state.checkMobile);
  console.log(isMobile);

  useEffect(() => {
    (async() => {
      fetchData(
        ['getCategories', 'getLinks'],
        "['CategoryName'][0]",
        'category',
        () => {}
      );
    })()
  }, []);

  let [state, baseSetState] = useState(StateDefault);
  const setState = (props: Partial<typeof StateDefault>) => baseSetState({...state, ...props});
  const hide = () => setState({selectedCategory: undefined, visible: false});
  
  useEffect(() => {
    if (!state.selectedCategory) { return; }
    const {categoryKey} = state.selectedCategory;
    setState({selectedProjects: state.projectsByCategory[categoryKey]});
  }, [state.selectedCategory]);

  const leftFlex = `${state.visible ? 1 : 6} 0 ${state.visible ? '20%' : '100%'}`;
  const rightFlex = `${state.visible ? 5 : 0} 0 ${isMobile ? '0%' : '80%'}`;

  return (
    <div style={{display: 'flex'}}>
      <div id='app__left-column' className='flex-column' style={{ flex: leftFlex }}>
        <SearchBar _records={state._records} setState={setState} />
        <div className='divider-1'></div>
        <CardContainer
          isMobile={isMobile}
          records={state.records}
          cardChange={setState}
          selectedCard={state.selectedCategory} />
      </div>
      <div id='app__detail-window' style={{ flex: rightFlex, maxWidth: '79vw' }}>
        <DetailWindow visible={state.visible} onHide={hide} className='p-sidebar-lg'>
          <FullCard selectedCard={state.selectedCategory} links={state.selectedProjects} />
        </DetailWindow>
      </div>
    </div>
  );
}

export default CategoryLibrary;