import { SelectButton } from 'primereact/selectbutton';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/root.reducer';
import ActiveLib from '../../types/lib.enum';
import { LIB_ACTIONS } from '../../../redux/lib.reducer';
import './_library-selector.scss'

interface SelectBtnOption {
  label: string;
  value: ActiveLib;
}
type SelectBtnOptions = SelectBtnOption[]

const LibrarySelector = ({className = ''}: {className: string}) => {
  const dispatch = useDispatch();
  const lib = useTypedSelector(({lib}) => lib)
  
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

  const onChange = (val: SelectBtnOption['value']) => dispatch({
    type: LIB_ACTIONS.LIB_SET,
    lib: val
  });

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