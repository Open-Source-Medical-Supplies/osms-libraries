import ActiveLib from "../../types/lib.enum";

export const getParam = (splitOn: ActiveLib) =>
	window.location && window.location.search
		? decodeURI(window.location.search.split(splitOn + "=")[1])
		: undefined;

export const genParamURL = (lib: ActiveLib, param: string, path?: string) => [
  window.location.protocol,
  '//',
  window.location.host,
  path ? path + '-library' : window.location.pathname,
  '?',
  lib,
  '=',
  encodeURI(param),
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

export const updateQueryParam = (activeLib: ActiveLib) => (param: string): void => {
	// update url w/o page reload
	if (!param) return;
	if (window.history && window.history.pushState) {
    const newurl = genParamURL(activeLib, param);
		window.history.pushState({ path: newurl }, '', newurl);
	} else {
		alert('Please update your browser version');
	}
};

