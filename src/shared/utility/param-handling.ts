import ActiveLib from "../../types/lib.enum";

export const getParam = (splitOn: ActiveLib) =>
	window.location && window.location.search
		? decodeURI(window.location.search.split(splitOn + "=")[1])
		: undefined;

// window.location.href = "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams?foo=baz";
// url = new URL(window.location.href)
// url.searchParams.toString()
// "foo=baz"
export const genParamURL = (param: {key: string, val: string}, path?: string) => [
  window.location.protocol,
  '//',
  window.location.host,
  path ? path + '-library' : window.location.pathname,
  '?',
  param.key,
  '=',
  encodeURI(param.val),
].join('');

export const genLocalParam = (
  destinationLib: ActiveLib,
  param: string,
  originLib?: ActiveLib
): string => [
    '/libraries/',
    destinationLib,
    '-library?',
    (originLib || destinationLib),
    '=',
    encodeURI(param)
  ].join('');

export const updateQueryParam = (activeLib: ActiveLib) => ({
  key,
  val
}: {
  key?: string;
  val: string;
}): void => {
  // update url w/o page reload
	if (!key || !val) return;
	if (window.history && window.history.pushState) {
    const keyVal = key || activeLib;
    const newurl = genParamURL({key: keyVal, val});
		window.history.pushState({ path: newurl }, '', newurl);
	} else {
		alert('Please update your browser version');
	}
};

