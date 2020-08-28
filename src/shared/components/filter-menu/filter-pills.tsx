import startCase from 'lodash.startcase';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DispatchFilterAction } from '../../../redux/filter.reducer';
import { FILTER_ACTIONS } from '../../constants/filter.constants';
import { FilterState } from '../../types/filter.type';
import { empty } from '../../utility/general.utility';
import { FilterNodeData } from '../../types/filter-node.type';
import { noFalsePositiveNodes } from './filter-menu.utilities';
import { BasicObject } from '../../types/shared.type';
 
interface Pill {
  label: string;
  key: string;
  parent: keyof FilterState;
}
type PillSet = BasicObject<Pill>;
interface PillInput {
  parent: keyof FilterState;
  payload: Partial<FilterState>;
};
type PillsInput = PillInput[];

const formatPills = (pillSets: PillsInput) => {
  const formattedPills: PillSet = {};
  pillSets.forEach(pillData => {
    for (const key in pillData.payload) {
      const pill = pillData.payload[(key as keyof FilterState)];
      
      if (!pill || noFalsePositiveNodes(pill as FilterNodeData)) continue;

      Object.keys(pillData.payload).forEach(key => {
        formattedPills[key] = {
          key,
          label: startCase(key),
          parent: pillData.parent
        }
      })
    }
  })
  return formattedPills;
}

const FilterPills: React.FC<{pills: PillsInput}> = ({pills}) => {
  const dispatch = useDispatch<DispatchFilterAction>();
  const [state, setState] = useState<PillSet>({});

  useEffect(() => {
    if (pills.every(pill => empty(pill))) {
      setState({});
    };
    const tempPills = formatPills(pills);
    setState(tempPills)
  }, [pills]);

  const clearPill = (pill: Pill) => {
    dispatch({
      type: FILTER_ACTIONS.REMOVE_ONE,
      payload: {
        [pill.parent]: pill.key
      }
    })
  }

  const chipTemplate = (pill: Pill) => (
    <li key={pill.key}
      className='p-tag p-tag-rounded p-tag-info' 
      onClick={() => clearPill(pill)}>
      <span>
        {pill.label}
      </span>
      <i className="pi pi-times" />
    </li>
  )

  const stateKeys = Object.keys(state);
  return (
    <ul className='filter-menu__pills'>
      {
        stateKeys.length ?
          stateKeys.map(key => chipTemplate(state[key])) :
          <span>No filters active</span>
      }
    </ul>
  );
};

export default FilterPills;