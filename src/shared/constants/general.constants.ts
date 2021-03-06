import { BasicObject } from "../types/shared.type";

export const HIDE_SELECTED = {
  selected: undefined,
  visible: false
};

// had to separate this from g-b.const.ts out because of a runtime compiling race condition ??
interface TableMapping extends BasicObject<string>{
  Project: "Project",
  CategoryInfo: "CategoryInfo",
  CategorySupply: "CategorySupply",
  FilterMenu: "FilterMenu",
  Material: "Material",
  Translations: "Translations"
}

export const TABLE_MAPPING: TableMapping = {
  Project: "Project",
  CategoryInfo: "CategoryInfo",
  CategorySupply: "CategorySupply",
  FilterMenu: "FilterMenu",
  Material: "Material",
  Translations: "Translations"
}