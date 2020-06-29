import detectMobile from '../shared/utility/detect-mobile.utility';
import { Action } from 'redux';

export const CHECK_MOBILE = 'checkMobile';

export const checkMobileReducer = (
  state = false,
  action: Action<typeof CHECK_MOBILE>
) => {
  switch(action.type) {
    case CHECK_MOBILE:
      return detectMobile();
    default:
      return state;
  }
}