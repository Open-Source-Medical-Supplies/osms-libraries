export const SET_LANG = "setLang";

export interface EnvType {
  isProd: boolean;
  isMobile: boolean;
}
const InitialState: EnvType = {
  isProd: false,
  isMobile: false,
};

export const langReducer = async (
  state: EnvType = InitialState,
  action: {
    type: typeof SET_LANG;
    payload: any;
  }
) => {
  switch (action.type) {
    case SET_LANG:
      return {
        staticLanguage: action.payload
      };
    default:
      return state;
  }
};
