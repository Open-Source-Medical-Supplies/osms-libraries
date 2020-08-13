
import { mapFilterData } from "../components/filter-menu/filter-menu.utilities";
import { CategoryInfo } from "../classes/category-info.class";
import { CategorySupply } from "../classes/category-supply.class";
import { Material } from "../classes/material.class";
import { Project } from "../classes/project.class";
import { valueof } from "../types/shared.type";
/**
 * Either
 * provide a Ctor to map the retrieved Array<{}> -> Array<classInstance>
 * or
 * provide a function that can handle an Array<{}>
 */
export const TABLE_MAPPING = {
  Project: "Project",
  CategoryInfo: "CategoryInfo",
  CategorySupply: "CategorySupply",
  FilterMenu: "FilterMenu",
  Material: "Material",
}
export const TableMap: {[key in valueof<typeof TABLE_MAPPING>]: Function} = {
  Project,
  CategoryInfo,
  CategorySupply,
  FilterMenu: mapFilterData,
  Material,
};