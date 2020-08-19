import ActiveLib from "../types/lib.enum";
import { valueof } from "../types/shared.type";
import { TABLE_MAPPING } from "./general.constants";

export enum SELECTED_ACTIONS {
  SET = 'SET',
  CHECK = 'CHECK',
  CLEAR = 'CLEAR',
}

export const SupportingDataMap: {[key in ActiveLib]: valueof<typeof TABLE_MAPPING>} = {
  [ActiveLib.CATEGORY]: TABLE_MAPPING.Project,
  [ActiveLib.PROJECT]: TABLE_MAPPING.Material
}
