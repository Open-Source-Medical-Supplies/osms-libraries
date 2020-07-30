import ActiveLib from "../../types/lib.enum";
import { valueof } from "../../types/shared.type";

enum Params {
  FILTERSTATE = 'filterState',
}

export const PARAMS = {
  ...Params,
  ...ActiveLib
}; 

export const getParam = (key: valueof<typeof PARAMS>, onlyVal = false) => {
  const url = new URL(window.location.href);
  let val = url.searchParams.get(key);
  try {
    if (val) {
      val = JSON.parse(val);
    }
  } catch {}

  return val ? (
    onlyVal ? val : { [key]: val }
  ) : undefined;
};

// used for creating links between libs
export const genLocalParam = (
  destinationLib: ActiveLib,
  param: string,
  originLib?: ActiveLib
): string =>
  [
    "/libraries/",
    destinationLib,
    "-library?",
    originLib || destinationLib,
    "=",
    encodeURI(param),
  ].join("");

export interface QueryParams {
  key?: string;
  val: string;
}
type UpdateQueryParm = (
  activeLib: ActiveLib
) => ({ key, val }: QueryParams) => void;
export const updateQueryParam: UpdateQueryParm = (activeLib) => ({
  key,
  val,
}) => {
  // update url w/o page reload
  if (!val) return;
  if (window.history && window.history.pushState) {
    const url = new URL(window.location.href);
    url.searchParams.set(key || activeLib, val);
    window.history.pushState(null, "", url.href);
  } else {
    alert("Please update your browser");
  }
};
