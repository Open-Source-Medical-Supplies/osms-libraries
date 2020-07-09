import { Action } from 'redux';
import ActiveLib from '../types/lib.enum';

export const libReducer = (
  state = ActiveLib.CATEGORY,
  action: Action<ActiveLib>
) => {
  switch (action.type) {
    case ActiveLib.CATEGORY: case ActiveLib.PROJECT:
      return action.type
    default:
      return state;
  }
}