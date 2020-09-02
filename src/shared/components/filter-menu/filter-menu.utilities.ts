import { Project } from "../../classes/project.class";
import { AirtableRecords } from "../../types/airtable.type";
import { FilterNodeData } from "../../types/filter-node.type";
import { FilterDatum, Filters, FilterState } from "../../types/filter.type";
import { BasicObject } from "../../types/shared.type";
import { allNotEmpty, notEmpty, CategoryComparator, createUUID } from "../../utility/general.utility";
import {
  getParam,
  PARAMS,
  QueryParams,
  setQueryParam
} from "../../utility/param-handling";

const buildTree = (data: FilterDatum, acc: any = {}) => {
  const { key, parentKey } = data;
  if (parentKey) {
    if (acc[parentKey]) {
      (acc[parentKey].children as FilterDatum[]).push(data);
    } else {
      acc[parentKey] = { children: [data] };
    }
  } else {
    if (key) {
      if (acc[key]) {
        acc[key] = {
          ...data,
          children: acc[key].children,
        };
      } else {
        acc[key] = {
          ...data,
          children: [],
        };
      }
    }
  }
  return acc;
};

export const mapFilterData = (data: AirtableRecords<FilterDatum>) => {
  // filter data comes in as a flat tree with pointers b/w parent / child
  const tempNodes: BasicObject<any> = {};
  const flatNodes: BasicObject<{
    key?: string;
    parentKey?: string;
    label?: string;
  }> = {};
  data.forEach(({fields}) => {
    if (fields.icon) {
      fields.icon = "pi " + fields.icon;
    }
    // nodes handling
    buildTree(fields, tempNodes);
    // end nodes

    // flatNodes handling
    if (fields?.key) {
      flatNodes[fields.key] = fields;
    }
    // end flatNodes
  })

  // object to array
  const nodes = Object.keys(tempNodes).map((nodeKey) => tempNodes[nodeKey])

  return {nodes, flatNodes};
}

const processAttributes = (nodeFilters: any, flatNodes: any) => {
  const attrs = [];
  for (const k in nodeFilters) {
    const v = nodeFilters[k];
    const notParent = !!flatNodes[k].parentKey;
    if (v.checked && notParent) {
      attrs.push(k);
    }
  }
  return attrs;
};

const combineFilters = (filterState: FilterState): Filters => {
  const {
    categoriesFilters,
    searchBar,
    nodeFilters,
    flatNodes,
    previousFilters,
  } = filterState;
  return {
    categories: categoriesFilters,
    attributes: processAttributes(nodeFilters, flatNodes),
    searchBar,
    previousFilters,
  };
};

const checkAttributes = (attrs: string[], projectJSON: any, flatNodes: any) => {
  if (Object.keys(attrs).length) {
    // cycle through the selected attributes
    for (const i in attrs) {
      const attr = flatNodes[attrs[i]];
      const target: string = attr.label;
      const pKey: string = flatNodes[attr.parentKey].key;
      const pVal: string | string[] = projectJSON[pKey];
      if (!pVal?.length) {
        return false;
      } else if (
        typeof pVal === "string" &&
        (pVal === target || pVal.includes(target))
      ) {
        return true;
      } else if (Array.isArray(pVal)) {
        // cycle through the object's attributes to test against the current one
        for (const j in pVal) {
          const testVal = pVal[j];
          if (testVal === target || testVal.includes(target)) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

const strMatches = (match: string, target: string) =>
  match.toLowerCase().includes(target.toLowerCase());

const checkSearchString = (target: string, projectJSON: Project): boolean => {
  if (target.length) {
    const { name, displayName } = projectJSON;
    let status = false;

    if (name instanceof Array) {
      status = !!(
        name.some((nom) => strMatches(nom, target)) ||
        (displayName && strMatches(displayName, target))
      );
    } else {
      status = !!(
        (name && strMatches(name, target)) ||
        (displayName && strMatches(displayName, target))
      );
    }

    return status;
  }
  return false;
};

const checkCategories = (cats: any, projectJSON: Project): boolean => {
  if (Object.keys(cats).length) {
    if (projectJSON.name instanceof Array) {
      return projectJSON.name.some((nom) => cats[nom]);
    } else {
      return cats[projectJSON.name];
    }
  }
  return false;
};

export const noFalsePositiveNodes = (attrs: FilterNodeData | undefined) => {
  if (!attrs || !Object.keys(attrs)) return true;

  let check = false;
  for (const k in attrs) {
    const { checked, partialChecked } = attrs[k];
    if (checked || partialChecked) {
      check = true;
    }
  }
  return check;
};

const filteringLevel = (filters: Filters, filterState: FilterState) => {
  // Checks if there are more filters active than the previous state
  /**
   * If debugging, don't compare 'current' to 'prev' since they don't account for the search string
   * Instead, look at 'stricter' && 'numFilters'
   */
  const byAttributes = notEmpty(filters.attributes) && noFalsePositiveNodes(filterState.nodeFilters);
  const byCategories = notEmpty(filters.categories);
  const byText = filters.searchBar.length;
  const current = +byAttributes + +byCategories;

  const prevByAttributes = noFalsePositiveNodes(filterState.previousFilters.nodeFilters);
  const prevByCategories = notEmpty(filterState.previousFilters.categoriesFilters);
  const prevByText = (filterState.previousFilters.searchBar || "").length
  const prev = +prevByAttributes + +prevByCategories;
  
  const stricter = (current > prev) && (prevByText < byText);
  const activeFilters = current + +(!!byText);

  return { stricter, activeFilters };
};

export const filterBy = (
  filterState: FilterState,
  _records: Project[],
  records: Project[]
) => {
  const filters = combineFilters(filterState);

  if (allNotEmpty(filters)) {
    const { stricter, activeFilters } = filteringLevel(filters, filterState);
    const recordsBase = stricter ? records : _records;

    return recordsBase.reduce((acc: Project[], project: Project) => {
      const checkAttrs = checkAttributes(
        filters.attributes,
        project,
        filterState.flatNodes
      );
      const checkCats = checkCategories(filters.categories, project);
      const checkText = checkSearchString(filters.searchBar, project);
      const matchedFilters = +checkAttrs + +checkText + +checkCats 
      const projectMatches = matchedFilters === activeFilters;

      if (projectMatches) {
        acc.push(project);
      }

      return acc;
    }, []);
  }
  return _records;
};

export const filtersToParams = (filterState: FilterState): QueryParams => {
  const { nodeFilters, categoriesFilters, searchBar } = filterState;
  return {
    key: PARAMS.FILTERSTATE,
    val: JSON.stringify({
      nodeFilters,
      categoriesFilters,
      searchBar
    })
  };
};

export const setFilterParams = (filterState: FilterState): void => {
  // some logic to reduce potential times params would be updated
  const currentParams = getParam(PARAMS.FILTERSTATE);
  const createdParams = filtersToParams(filterState);
  if (!currentParams || currentParams !== createdParams.val) {
    setQueryParam(createdParams);
  }
};

/** Returns a grotesque string that acts as a hash token for useEffect */
export const getFilterHash = (filter: FilterState, catCompare: CategoryComparator) => {
  const nodeFiltersBool = Object.keys(filter.nodeFilters).length;
  const catFilterBool = catCompare.compareKeys(
    filter.categoriesFilters,
    filter.previousFilters.categoriesFilters
  ) ? createUUID() : false;

  return [
    catFilterBool,
    nodeFiltersBool,
    filter.searchBar,
    JSON.stringify(filter.nodeFilters),
    JSON.stringify(filter.categoriesFilters),
  ].join();
}