import { BasicObject } from "../types/shared.type";

export const SET_LANG = "setLang";

export type LangType  = BasicObject<string>;

export const langReducer = (
  state: LangType = {},
  action: {
    type: typeof SET_LANG;
    payload: any;
  }
) => {
  switch (action.type) {
    case SET_LANG:
      return action.payload;
    default:
      return state;
  }
};
