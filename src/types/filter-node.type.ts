export type FilterNode = {};
export type FilterNodes = FilterNode[];

export interface FilterNodeData {
  [key: string]: {
    checked: boolean;
    partialChecked: boolean;
  }
}