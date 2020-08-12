import { Sidebar } from 'primereact/sidebar';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { CategoryInfo } from '../../classes/category-info.class';
import { useTypedSelector } from "../../redux/root.reducer";
import { SelectAction, SELECTED_ACTIONS } from '../../redux/selected.reducer';
import { TABLE_MAPPING } from '../../services/google-bucket.service';
import CardContainer from '../../shared/components/card-container/card-container';
import DetailWindow from '../../shared/components/detail-window/detail-window';
import Loading from '../../shared/components/loading';
import ActiveLib from '../../types/lib.enum';
import CategoryLibFullCard from './category-library.full-card';
import CategorySearchBar from './category-search-bar';

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
  dispatch({type: ActiveLib.CATEGORY});

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
  }));

  // local state
  let [state, baseSetState] = useState(DefaultState);
  const setState = (props: Partial<typeof DefaultState>) => baseSetState({...state, ...props});
  const hide = () => dispatch<SelectAction>({
    type: SELECTED_ACTIONS.CLEAR
  });

  useEffect(() => {
    if (tables.completed) {
      setState({
        records: tables.loaded[TABLE_MAPPING.CategoryInfo] as CategoryInfo[],
        _records: tables.loaded[TABLE_MAPPING.CategoryInfo] as CategoryInfo[]
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
      <CategoryLibFullCard selected={selected.data as CategoryInfo} links={selected.projects} />
    </Sidebar>
  );

  const DesktopDetailWindow = (
    <DetailWindow visible={!!selected.data} onHide={hide} className='p-sidebar-lg'>
      <CategoryLibFullCard selected={selected.data as CategoryInfo} links={selected.projects} />
    </DetailWindow>
  );
  
  const SelectedDetailWindow = isMobile ? MobileDetailWindow : DesktopDetailWindow;

  return (
    <div id='category-library' className='library-container'>
      <div id='app__left-column' className='flex-column' style={{ flex: leftFlex }}>
        <CategorySearchBar _records={state._records} setState={setState} />
        <div className='divider-1'></div>
        <Loading loading={tables.completed}>
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