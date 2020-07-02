import { parseFilterData, flattenRecords } from "../shared/components/filter-menu/filter-menu.utilities";
import { AirtableCalls, AirtableHelpers } from "./airtable";

export const parseFilterMenu = async () => {
  const records = await AirtableHelpers.callATbase(AirtableCalls.getFilterMenu) as {}[];
  const nodes: {}[] = parseFilterData(Object.assign([], records));
  const flatNodes: {}[] = flattenRecords(Object.assign([], records));
  return ({ nodes, flatNodes });
};

export const parseCategories = async () => {
  console.warn('this is redundant if you did the store properly')
  const records = await AirtableHelpers.callATbase(AirtableCalls.getCategories) as {}[];
  return ({ categories: records });
};
