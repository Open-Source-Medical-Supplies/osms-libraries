import ActiveLib from "../types/lib.enum";

export enum PARAMS {
  FILTERSTATE = 'filterState',
  SELECTED = 'selected'
}

const getUrl = () => {
  return new URL(window.location.href);
}
const getParamFromUrl = (k: PARAMS) => getUrl().searchParams.get(k);

export const getParam = (key: PARAMS, onlyVal = true) => {
  let val = getParamFromUrl(key);
  try {
    if (val) {
      val = JSON.parse(val);
    }
  } catch {}

  return val ? (
    onlyVal ? val : { [key]: val }
  ) : undefined;
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

export const updateQueryParam = ({ key, val }: QueryParams): void => {
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
