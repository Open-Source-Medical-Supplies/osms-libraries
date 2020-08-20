import { SelectButton } from 'primereact/selectbutton';
import React from 'react';
import { useDispatch } from 'react-redux';
import { LIB_ACTIONS, DispatchLibAction, LibAction } from '../../../redux/lib.reducer';
import { useTypedSelector } from '../../../redux/root.reducer';
import { CategoryInfo } from '../../classes/category-info.class';
import { Project } from '../../classes/project.class';
import { FILTER_ACTIONS } from '../../constants/filter.constants';
import { TABLE_MAPPING } from '../../constants/general.constants';
import ActiveLib, { ActiveLibToClassName } from '../../types/lib.enum';
import './_library-selector.scss';
import { DispatchFilterAction, FilterAction } from '../../../redux/filter.reducer';

interface SelectBtnOption {
  label: string;
  value: ActiveLib;
}
type SelectBtnOptions = SelectBtnOption[]

const LibrarySelector = ({className = ''}: {className: string}) => {
  const dispatch = useDispatch();
  const {lib, tables} = useTypedSelector(({lib, tables}) => ({lib, tables}))
  
  const options: SelectBtnOptions = [
    {
      label: 'Categories',
      value: ActiveLib.CATEGORY
    },
    {
      label: 'Projects',
      value: ActiveLib.PROJECT
    }
  ];

  const onChange = (val: SelectBtnOption['value']) => {
    if (!val || val === lib.active) return;
    
    const filterAction: FilterAction = {
      type: FILTER_ACTIONS.CLEAR_FILTER
    };
    dispatch(filterAction);
    
    const focus = tables.loaded[TABLE_MAPPING[ActiveLibToClassName[val]]] as Project[] | CategoryInfo[];
    const libAction: LibAction = {
      type: LIB_ACTIONS.SET_LIB,
      active: val,
      _data: focus,
      data: focus
    };
    dispatch(libAction);
  };

  return (
    <div className={'library-selector ' + className}>
      <SelectButton
        value={lib}
        options={options}
        onChange={(e) => onChange(e.value)}/>
    </div>
  )
};

export default LibrarySelector;