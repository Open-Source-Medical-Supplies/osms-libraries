export type BasicObject<T> = {[key: string]: T};

export type valueof<T> = T[keyof T];

export interface Indexable {
  [k: string]: any;
}