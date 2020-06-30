import { allNotEmpty, MAPPER, notEmpty } from "../../shared/utilities";
import { FilterState, PrimeAttr } from "./filter-menu.interface";

interface Record {
  key?: string;
  parentKey?: string;
  icon?: string;
  children?: Record[];
}
type Records = Record[];
type Filters = {
  categories: {};
  attributes: string[];
  searchBar: string;
};

const buildTree = (data: Record, acc: any = {}) => {
  const { key, parentKey } = data;
  if (parentKey) {
    if (acc[parentKey]) {
      (acc[parentKey].children as Record[]).push(data);
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

export const parseRecords = (records: Records) => {
  const mappedRecords = (records.reduce((acc, record) => {
    if (record.icon) {
      record.icon = "pi " + record.icon;
    }
    buildTree(record, acc);
    return acc;
  }, {}) as unknown) as { [key: string]: Record };

  return Object.keys(mappedRecords).map((nodeKey) => mappedRecords[nodeKey]);
};

export const flattenRecords = (records: Records) => {
  return records.reduce((acc: any, val) => {
    if (val && val.key) {
      const vk = val.key;
      acc[vk] = val;
      // I was going to delete the 'key' b/c of redundancy,
      // but the pointers refused to detach and were deleting it elsewhere
    }
    return acc;
  }, {});
};

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
  const { categoriesFilters, searchBar, nodeFilters, flatNodes } = filterState;
  return {
    categories: categoriesFilters,
    attributes: processAttributes(nodeFilters, flatNodes),
    searchBar,
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
      } else if (typeof pVal === 'string' && (pVal === target || pVal.includes(target))) {
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

const checkSearchString = (
  target: string,
  projectJSON: ReturnType<typeof MAPPER.ProjectToJSON>
) => {
  if (target.length) {
    const { name, displayName } = projectJSON;
    return (
      name.toLowerCase().includes(target.toLowerCase()) ||
      displayName.toLowerCase().includes(target.toLowerCase())
    );
  }
  return false;
};

const checkCategories = (
  cats: any,
  projectJSON: ReturnType<typeof MAPPER.ProjectToJSON>
) => {
  if (Object.keys(cats).length) {
    return cats[projectJSON.displayName];
  }
  return false;
};

const deepCheckAttributes = (attrs: string[], primeAttrs: PrimeAttr) => {
  return notEmpty(attrs) && noFalsePositives(primeAttrs);
};

const noFalsePositives = (attrs: PrimeAttr) => {
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
  // if there are more filters than the previous state
  const byAttributes = deepCheckAttributes(
    filters.attributes,
    filterState.nodeFilters
  );
  const byCategories = notEmpty(filters.categories);
  const byText = !!filters.searchBar.length;
  const current = +byAttributes + +byCategories;

  const prevByAttributes = deepCheckAttributes(
    filters.attributes,
    filterState.previousFilters.nodeFilters || {}
  );
  const prevByCategories = notEmpty(filterState.previousFilters.categoriesFilters || {});
  const prevByText = !!(filterState.previousFilters.searchBar || '').length;
  const prev = +prevByAttributes + +prevByCategories;
  
  return {
    stricter: current > prev && byText > prevByText,
    numFilters: current + +byText,
  };
};

const getFilterLevels = ({
  checkAttrs,
  checkText,
  checkCats,
}: {
  checkAttrs: boolean;
  checkText: boolean;
  checkCats: boolean;
}): { [key: number]: boolean } => ({
  1: checkAttrs || checkText || checkCats,
  2: (checkAttrs && checkText) ||
    (checkAttrs && checkCats) ||
    (checkText && checkCats),
  3: checkAttrs && checkText && checkCats,
});

export const filterBy = (
  filterState: FilterState,
  _records: Records,
  records: Records
) => {
  const filters = combineFilters(filterState);

  if (allNotEmpty(filters)) {
    const filterLevel = filteringLevel(filters, filterState);
    const recordsBase = filterLevel.stricter ? records : _records;

    return recordsBase.reduce((acc: Records, project) => {
      const projectJSON = MAPPER.ProjectToJSON(project);

      const checkAttrs = checkAttributes(filters.attributes, projectJSON, filterState.flatNodes);
      const checkText = checkSearchString(filters.searchBar, projectJSON);
      const checkCats = checkCategories(filters.categories, projectJSON);

      const projectMatches = getFilterLevels({checkAttrs, checkText, checkCats})[filterLevel.numFilters];

      if (projectMatches) {
        acc.push(project);
      }

      return acc;
    }, []);
  }
  return _records;
};
