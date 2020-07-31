import { Sidebar } from 'primereact/sidebar';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CategoryInfo } from '../../classes/category-info.class';
import { CrossLinks, Project } from '../../classes/project.class';
import { RootState } from "../../redux/root.reducer";
import { fetchData } from '../../services/app.service';
import CardContainer from '../../shared/components/card-container/card-container';
import DetailWindow from '../../shared/components/detail-window/detail-window';
import Loading from '../../shared/components/loading';
import { hideSelected } from '../../shared/utility/general.utility';
import ActiveLib from '../../types/lib.enum';
import CategoryLibFullCard from './category-library.full-card';
import CategorySearchBar from './category-search-bar';

const StateDefault: {
  _records: []; // immutable
  records: [];
  selected: undefined | CategoryInfo;
  visible: boolean;
  projectsByCategory: CrossLinks;
  selectedProjects: Project[];
  loading: boolean;
} = {
  _records: [], // immutable
  records: [],
  selected: undefined,
  visible: false,
  projectsByCategory: {},
  selectedProjects: [],
  loading: true
};

const CategoryLibrary: React.FC = () => {
  const dispatch = useDispatch();
  dispatch({type: ActiveLib.CATEGORY});
  
  let [state, baseSetState] = useState(StateDefault);
  const isMobile = useSelector<RootState, boolean>(({env}) => env.isMobile);
  const setState = (props: Partial<typeof StateDefault>) => baseSetState({...state, ...props});
  const setLoadingState = (d: Partial<typeof StateDefault>) => setState({loading: false, ...d});
  const hide = hideSelected(setState);

  useEffect(() => {
    (async() => {
      fetchData<CategoryInfo, typeof setLoadingState>(
        ['getCategories', 'getLinks'],
        "displayName",
        setLoadingState
        );
      })()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    if (!state.selected) { return; }
    const key = state.selected.displayName;
    setState({selectedProjects: state.projectsByCategory[key]});
  }, [state.selected]); // eslint-disable-line react-hooks/exhaustive-deps

  const leftFlex = `${state.visible ? 1 : 6} 0 ${state.visible ? '20%' : '100%'}`;
  const rightFlex = `${state.visible ? 5 : 0} 0 ${isMobile ? '0%' : '80%'}`;

  const MobileDetailWindow = (
    <Sidebar
      position='right'
      fullScreen={true}
      visible={state.visible}
      onHide={hide}>
      <CategoryLibFullCard selected={state.selected as CategoryInfo} links={state.selectedProjects} />
    </Sidebar>
  );

  const DesktopDetailWindow = (
    <DetailWindow visible={state.visible} onHide={hide} className='p-sidebar-lg'>
      <CategoryLibFullCard selected={state.selected as CategoryInfo} links={state.selectedProjects} />
    </DetailWindow>
  );
  
  const SelectedDetailWindow = isMobile ? MobileDetailWindow : DesktopDetailWindow;

  return (
    <div id='category-library' className='library-container'>
      <div id='app__left-column' className='flex-column' style={{ flex: leftFlex }}>
        <CategorySearchBar _records={state._records} setState={setState} />
        <div className='divider-1'></div>
        <Loading loading={state.loading}>
          <CardContainer
            isMobile={isMobile}
            records={state.records}
            cardChange={setState}
            selected={state.selected as CategoryInfo} />
        </Loading>
      </div>
      <div id='app__detail-window' style={{ flex: rightFlex, maxWidth: '79vw' }}>
        {SelectedDetailWindow}
      </div>
    </div>
  );
}

export default CategoryLibrary;