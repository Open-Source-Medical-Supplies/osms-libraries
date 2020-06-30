import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { CrossLinks, ProjectType } from '../../classes/project.class';
import { RootState } from "../../redux/root.reducer";
import { fetchData } from '../../services/app.service';
import CardContainer from '../../shared/components/card-container/card-container';
import DetailWindow from '../../shared/components/detail-window/detail-window';
import CategoryLibFullCard from './category-library.full-card';
import SearchBar from '../../shared/components/search-bar';
import { CategoryInfoType } from '../../classes/category-info.class';

const StateDefault: {
  _records: [], // immutable
  records: [],
  selected: undefined | CategoryInfoType,
  visible: false,
  projectsByCategory: CrossLinks,
  selectedProjects: ProjectType[]
} = {
  _records: [], // immutable
  records: [],
  selected: undefined,
  visible: false,
  projectsByCategory: {},
  selectedProjects: []
};

const CategoryLibrary: React.FC = () => {
  const isMobile = useSelector((state: RootState) => state.checkMobile);
  let [state, baseSetState] = useState(StateDefault);
  const setState = (props: Partial<typeof StateDefault>) => baseSetState({...state, ...props});
  
  useEffect(() => {
    (async() => {
      fetchData<typeof setState>(
        ['getCategories', 'getLinks'],
        "['CategoryName'][0]",
        'category',
        setState
        );
      })()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const hide = () => setState({selected: undefined, visible: false});
  
  useEffect(() => {
    if (!state.selected) { return; }
    const {categoryKey} = state.selected;
    setState({selectedProjects: state.projectsByCategory[categoryKey]});
  }, [state.selected]); // eslint-disable-line react-hooks/exhaustive-deps

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
          selected={state.selected as CategoryInfoType} />
      </div>
      <div id='app__detail-window' style={{ flex: rightFlex, maxWidth: '79vw' }}>
        <DetailWindow visible={state.visible} onHide={hide} className='p-sidebar-lg'>
          <CategoryLibFullCard selected={state.selected as CategoryInfoType} links={state.selectedProjects} />
        </DetailWindow>
      </div>
    </div>
  );
}

export default CategoryLibrary;