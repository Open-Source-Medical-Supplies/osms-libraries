import { BasicObject } from "../types/shared.type";

export enum PARAMS {
  FILTERSTATE = "filterState",
  SELECTED = "selected",
  LIBRARY = "library",
}
export enum PARAM_TYPES {
  STRING = "STRING",
  ARRAY = "ARRAY",
  DICT = "DICT",
}

export interface QueryParams {
  key: PARAMS;
  val: string;
}

const getUrl = () => new URL(window.location.href);
const getParamFromUrl = (k: PARAMS) => getUrl().searchParams.get(k);
const parseParam = <T = any>(key: PARAMS): T => {
  let val: any = getParamFromUrl(key);
  try {
    if (val) {
      val = JSON.parse(val);
    }
  } catch {
    val = "";
  }
  return val;
};

/**
 * Retrieves 1+ params and can return either a string [default], string array, or dict
 *
 * Does not perform any null-checking
 */
export const getParam = <T = any>(
  keys: PARAMS | PARAMS[],
  returnType: PARAM_TYPES = PARAM_TYPES.STRING
): T | T[] | BasicObject<T> | null => {
  switch (returnType) {
    case PARAM_TYPES.STRING:
      if (keys instanceof Array) {
        console.warn(
          "An array input cannot be a string output; defaulting to ARRAY"
        );
        return getParam(keys, PARAM_TYPES.ARRAY);
      }
      return parseParam(keys);
    case PARAM_TYPES.ARRAY:
      if (!(keys instanceof Array)) {
        keys = [keys];
      }
      return keys.reduce((acc: T[], key: PARAMS) => {
        acc.push(parseParam(key));
        return acc;
      }, []);
    case PARAM_TYPES.DICT:
      if (!(keys instanceof Array)) {
        keys = [keys];
      }
      return keys.reduce((acc: BasicObject<T>, key: PARAMS) => {
        acc[key] = parseParam(key);
        return acc;
      }, {});
  }
};

export const removeParam = (key: PARAMS): void => {
  const url = getUrl();
  url.searchParams.delete(key);
  softUpdateURL(url);
};

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

const softUpdateURL = (url: URL): void => {
  // update url w/o page reload
  window.history.pushState(null, "", url.href);
};
