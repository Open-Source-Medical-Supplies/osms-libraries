import { CheckMobileAction, CHECK_MOBILE } from '../actions/check-mobile.action';

export const checkMobileReducer = (
  state = false,
  action: CheckMobileAction
) => {
  switch(action.type) {
    case CHECK_MOBILE:
      return action.payload || state;
    default:
      return state;
  }
}