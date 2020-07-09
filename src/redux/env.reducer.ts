import { Action } from 'redux';
import detectMobile from '../shared/utility/detect-mobile.utility';

export const SET_ENV = 'setEnv';

export interface EnvType {
  isProd: boolean;
  isMobile: boolean;
}
const InitialState: EnvType = {
  isProd: false,
  isMobile: false
}

export const envReducer = (
  state: EnvType = InitialState,
  action: Action<typeof SET_ENV>
) => {
  switch(action.type) {
    case SET_ENV:
      return {
        isProd: /open-source-medical-supplies|opensourcemedicalsupplies/.test(window.location.href),
        isMobile: detectMobile()
      }
    default:
      return state;
  }
}