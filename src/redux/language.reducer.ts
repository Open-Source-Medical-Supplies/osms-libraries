import { Action } from 'redux';
import { IETF } from '../shared/constants/ietf.constants';
import { Dispatch } from 'react';

export interface LanguageBase {
  [IETF: string]: {
    [key: string]: string;
  };
}

export interface LanguageState {
  selected?: IETF;
  base?: LanguageBase;
}
const LangState: LanguageState = {
  selected: IETF["en-US"],
  base: {},
}

export enum LANG_ACTIONS {
  INIT_LANGS = 'INIT_LANGS',
  SELECT_LANG = 'SELECT_LANG',
}

export interface LanguageAction extends Action<LANG_ACTIONS>, LanguageState {}
export type DispatchLanguageAction = Dispatch<LanguageAction>;

export const languageReducer = (
  state: LanguageState = LangState,
  action: LanguageAction
): LanguageState => {
  const navLang = navigator.language as IETF;
  switch(action.type) {
    case LANG_ACTIONS.INIT_LANGS:
      return {
        selected: action.selected || navLang,
        base: action.base || state.base,
      }
    case LANG_ACTIONS.SELECT_LANG:
      if (!action.selected) return state;
      return {
        selected: action.selected || navLang,
        base: state.base,
      }
    default:
      return state;
  }
}