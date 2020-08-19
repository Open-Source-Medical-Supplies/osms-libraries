import { TableState } from "../../redux/tables.reducer";
import ActiveLib from "../types/lib.enum";
import { SelectedState, SupportingData, SupportingDatum, SupportingDataSet } from "../types/selected.type";
import { toDict } from "./general.utility";
import { getParam, PARAMS } from "./param-handling";
import { TABLE_MAPPING } from "../constants/general.constants";
import { valueof } from "../types/shared.type";

export const SupportingDataMap: {[key in ActiveLib]: valueof<typeof TABLE_MAPPING>} = {
  [ActiveLib.CATEGORY]: TABLE_MAPPING.Project,
  [ActiveLib.PROJECT]: TABLE_MAPPING.Material
}


export const getSupportingData = (selected: string, supportingDataSet: SelectedState['supportingDataSet']) => {
  if ( !selected || !supportingDataSet ) {
    return [];
  } else {
    return supportingDataSet[selected];
  }
}

export const parseTablesToSupportingDataSet = (
  tables: TableState['loaded'],
): SupportingDataSet => {
  const activeLib = getParam(PARAMS.LIBRARY) as ActiveLib;
  let table;

  try {
    table = tables[SupportingDataMap[activeLib]] as SupportingData;
  } catch {
    return {}
  }

  return toDict<SupportingDatum>(table , 'name')
}

export const parseTablesToSupportingData = (
  tables: TableState['loaded'],
  supportTarget: string
): SupportingData => {
  return parseTablesToSupportingDataSet(tables)[supportTarget]
}