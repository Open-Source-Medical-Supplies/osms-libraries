export type BasicObject<T> = {[key: string]: T};
export type NestedBasicObject<T> = BasicObject<BasicObject<T>>;

export type valueof<T> = T[keyof T];

export interface Indexable {
  [k: string]: any;
}

export type Constructor<T> = new (...args: any[]) => T;