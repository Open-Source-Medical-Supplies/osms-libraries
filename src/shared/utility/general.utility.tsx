import React from 'react';
import { BasicObject } from '../types/shared.type';
import get from 'lodash.get';
import { HIDE_SELECTED } from '../constants/general.constants';
import { removeParam, PARAMS } from './param-handling';

export const OpenExternalSafely = '_blank noopener noreferrer nofollow';

export const openExternal = (link: string) => () => window.open(link, OpenExternalSafely);

export const AopenExternal = (href: string, children: React.ReactNode) => <a href={href} target='_blank' rel='noopener noreferrer nofollow'>{children}</a>

export const notEmptyStr = (s: string): boolean => /\w|\d/.test(s);
export const emptyStr = (s: string) => !notEmptyStr(s);

export const empty = (o: {} | undefined): boolean => !!o && !Object.keys(o).length;

export const notEmpty = (o: {} | undefined): boolean => !empty(o);

export const allEmpty = (o: any): boolean => {
  for (const k in o) {
    const v = o[k];
    if (
      ( typeof v === 'object' && notEmpty(v) ) ||
      ( typeof v === 'string' && !!v.length )
    ) {
      return false;
    }
  }
  return true;
}

export const allNotEmpty = (o: {}): boolean => !allEmpty(o);

export class CategoryComparator {
  state: any;
  previous: any;

  compareKeys (state: {}, previous: {}): boolean {
    if (state === this.state && previous === this.previous) {
      return false;
    }
    this.state = state;
    this.previous = previous;
  // false if previous is empty
  // true if key lengths are different
  // true if key lengths are equal but keys are different
  // false if the 'same' object (mem pointers not withstanding)
  const a = Object.keys(state);
  const b = Object.keys(previous);
  if (a < b || a > b) {
    return true;
  }
  for(const k in a) {
    if (!b[k]) {
       return true;
    }
  }
  return false;
}
}

export const noFalsePositives = (objects: {[k: string]: {[k: string]: any}} | {[k: string]: boolean}, invert = false): boolean => {
  let check = invert ? true : false;
  for (const k in objects) {
    const o = objects[k]; // Object.keys(bool) => []

    if (typeof o === 'boolean') {
      if (o) {
        check = invert ? false : true;
        return check;
      }
    } else {
      for (const j in o) {
        if (o[j]) {
          check = invert ? false : true;
          return check;
        }
      }
    }
  }
  return check;
}

export const createUUID = () => Math.round(Math.random() * 10000);

export const isPartialObject = (base: BasicObject<any>, test: BasicObject<any>) => {
  for (const k in base) {
    // if a key from the base object is not in test => isPartial
    if (!test.hasOwnProperty(k)) {
      return true;
    }
  }
  return false;
}

export const timeNow = (): number => {
  return new Date().getTime();
}


export const toDict = <T extends any> (data: T[], index: string) => {
  // do NOT change the key name otherwise it won't match elsewhere
  return data.reduce((acc: BasicObject<T[]>, datum: T) => {
    const key = get(datum, index);
    if (acc[key]) {
      acc[key].push(datum);
    } else {
      acc[key] = [datum]
    }
		return acc;
	}, {});
}

export const hideSelected = (setState: Function) => () => {
  removeParam(PARAMS.SELECTED);
  setState(HIDE_SELECTED);
};

export const scrollToTop = () => {
  try {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } catch (e) {
    document.documentElement.scrollTop = 0;
  }
}