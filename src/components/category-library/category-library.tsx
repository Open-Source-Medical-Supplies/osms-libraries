import { Sidebar } from 'primereact/sidebar';
import React, { useEffect, useState, useRef } from 'react';
import { shallowEqual, useDispatch } from "react-redux";
import { CategoryInfo } from '../../shared/classes/category-info.class';
import { Project } from '../../shared/classes/project.class';
import { useTypedSelector } from "../../redux/root.reducer";
import { SelectAction, SELECTED_ACTIONS } from '../../redux/selected.reducer';
import CardContainer from '../../shared/components/card-container/card-container';
import DetailWindow from '../../shared/components/detail-window/detail-window';
import Loading from '../../shared/components/loading';
import ActiveLib from '../../shared/types/lib.enum';
import { BasicObject } from '../../shared/types/shared.type';
import CategoryLibFullCard from './category-library.full-card';
import CategorySearchBar from './category-search-bar';
import { TABLE_MAPPING } from '../../shared/constants/google-bucket.constants';

const DefaultState: {
  _records: CategoryInfo[]; // immutable
  records: CategoryInfo[];
} = {
  _records: [], // immutable
  records: [],
};

const CategoryLibrary: React.FC = () => {
  // Redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: ActiveLib.CATEGORY});
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


  // local state
  let [state, setState] = useState(DefaultState);
  const hide = () => dispatch<SelectAction>({
    type: SELECTED_ACTIONS.CLEAR
  });

  useEffect(() => {
    console.log('no')
    if (tables.completed) {
      console.log('yes')
      dispatch<SelectAction>({
        type: SELECTED_ACTIONS.CHECK,
        projectSet: tables.loaded.projectsByCategory as BasicObject<Project[]>
      });
      setState({
        records: tables.loaded[TABLE_MAPPING.CategoryInfo] as CategoryInfo[],
        _records: tables.loaded[TABLE_MAPPING.CategoryInfo] as CategoryInfo[],
      })
    }
  }, [tables.completed]) // eslint-disable-line react-hooks/exhaustive-deps

  const leftFlex  = `${selected.data ? 1 : 6} 0 ${selected.data ? '20%' : '100%'}`;
  const rightFlex = `${selected.data ? 5 : 0} 0 ${isMobile ? '0%' : '80%'}`;

  const MobileDetailWindow = (
    <Sidebar
      position='right'
      fullScreen={true}
      visible={!!selected.data}
      onHide={hide}>
      <CategoryLibFullCard/>
    </Sidebar>
  );

  const DesktopDetailWindow = (
    <DetailWindow visible={!!selected.data} onHide={hide} className='p-sidebar-lg'>
      <CategoryLibFullCard/>
    </DetailWindow>
  );
  
  const SelectedDetailWindow = isMobile ? MobileDetailWindow : DesktopDetailWindow;

  return (
    <div id='category-library' className='library-container'>
      <div id='app__left-column' className='flex-column' style={{ flex: leftFlex }}>
        <CategorySearchBar _records={state._records} setState={setState} />
        <div className='divider-1'></div>
        <Loading loading={!tables.completed}>
          <CardContainer
            isMobile={isMobile}
            records={state.records}
            selected={selected.data as CategoryInfo} />
        </Loading>
      </div>
      <div id='app__detail-window' style={{ flex: rightFlex, maxWidth: '79vw' }}>
        {SelectedDetailWindow}
      </div>
    </div>
  );
}

export default CategoryLibrary;