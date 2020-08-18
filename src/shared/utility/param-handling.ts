import ActiveLib from "../types/lib.enum";
import { BasicObject } from "../types/shared.type";

export enum PARAMS {
  FILTERSTATE = 'filterState',
  SELECTED = 'selected',
  LIBRARY = 'library'
}
export enum PARAM_TYPES {
  STRING = 'STRING',
  ARRAY = 'ARRAY',
  DICT = 'DICT'
}

type GetParamReturn<T> = null
  | string
  | T
  | Array<T | string | null>
  | BasicObject<T | string | null>

const getUrl = () => new URL(window.location.href);
const getParamFromUrl = (k: PARAMS) => getUrl().searchParams.get(k);
const parseParam = (key: PARAMS) => {
  let val = getParamFromUrl(key);
  try { if (val) {
    val = JSON.parse(val);
  } } catch {}
  return val;
}

/**
 * Retrieves 1+ params and can return either a string [default], string array, or dict
 * 
 * Does not perform any null-checking
 */
export const getParam = <T> (
  keys: PARAMS | PARAMS[],
  returnType: PARAM_TYPES = PARAM_TYPES.STRING
): GetParamReturn<T> => {
  switch (returnType) {
    case PARAM_TYPES.STRING:
      if (keys instanceof Array) {
        console.warn('An array input cannot be a string output; defaulting to ARRAY');
        return getParam(keys, PARAM_TYPES.ARRAY);
      }
      return parseParam(keys);
    case PARAM_TYPES.ARRAY:
      if (!(keys instanceof Array)) {
        keys = [keys];
      }
      return keys.reduce((acc: Array<string | null> , key) => {
        let val = getParamFromUrl(key);
        try {
          if (val) {
            val = JSON.parse(val);
          }
        } catch {}
      
        acc.push(val)
        return acc;
      }, []);
    case PARAM_TYPES.DICT:
      if (!(keys instanceof Array)) {
        keys = [keys];
      }
      return keys.reduce((acc: BasicObject<string | null> , key) => {
        let val = getParamFromUrl(key);
        try {
          if (val) {
            val = JSON.parse(val);
          }
        } catch {}
      
        acc[key] = val
        return acc;
      }, {});
  }

  
};

export const removeParam = (key: PARAMS): void => {
  const url = getUrl();
  url.searchParams.delete(key);
  softUpdateURL(url);
}

// used for creating links between libs
export const genLocalParam = (
  lib: ActiveLib,
  param: string,
): string =>
  [
    "/libraries/",
    lib,
    "-library?",
    PARAMS.SELECTED,
    "=",
    encodeURI(param),
  ].join("");

export interface QueryParams {
  key?: string;
  val: string;
}

export const setQueryParam = ({ key, val }: QueryParams): void => {
  if (!key || !val) return;
  if (window.history && window.history.pushState) {
    const url = getUrl();
    url.searchParams.set(key, val);
    softUpdateURL(url);
  } else {
    alert("Please update your browser");
  }
};

const softUpdateURL = (url: URL): void=> {
  // update url w/o page reload
  window.history.pushState(null, "", url.href);
}
