import classNames from "classnames";
import { DataView } from "primereact/dataview";
import { Panel } from "primereact/panel";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "../../../redux/actions/filter.action";
import { DispatchFilterAction } from "../../../redux/filter.reducer";
import { useTypedSelector } from "../../../redux/root.reducer";
import { CategorySupply } from "../../classes/category-supply.class";
import { TABLE_MAPPING } from "../../constants/general.constants";
import { empty, notEmpty } from "../../utility/general.utility";
import { getLang } from "../../utility/language.utility";
import "./_category-list.scss";

/* eslint-disable react-hooks/exhaustive-deps */
type MouseEvent = React.MouseEvent<HTMLElement>;
type CategoryState = {
  toggleState: {
    [k: string]: boolean;
  };
  _categories: CategorySupply[];
  categories: CategorySupply[];
};

const defaultState: CategoryState = {
  toggleState: {},
  _categories: [],
  categories: [],
};

const CategoriesList = () => {
  const [catState, setBaseCatState] = useState<CategoryState>(defaultState);
  const setCatState = (props?: Partial<CategoryState>) => setBaseCatState({ ...catState, ...props });
  const dispatch = useDispatch<DispatchFilterAction>();
  const { tables, filter } = useTypedSelector(({ tables, filter }) => ({
    tables,
    filter,
  }));
  let { categoriesFilters } = filter;
  const Lang = getLang();

  useEffect(() => {
    if (tables.completed) {
      const loadedCategories = (tables.loaded[
        TABLE_MAPPING.CategorySupply
      ] as CategorySupply[]).sort((a, b) => a.name.localeCompare(b.name));

      setCatState({
        _categories: loadedCategories,
        categories: loadedCategories,
      });
    }
  }, [tables.completed]);

  useEffect(() => {
    let tempToggleState: CategoryState["toggleState"] = {};
    // ensure deactivated toggles on selection-clear
    if (empty(categoriesFilters) && notEmpty(catState)) {
      tempToggleState = Object.assign({}, catState.toggleState);
      for (const k in tempToggleState) {
        tempToggleState[k] = false;
      }
    } else if (notEmpty(categoriesFilters)) {
      // loaded from params
      tempToggleState = categoriesFilters;
    }

    if (!!catState._categories.length) {
      setCatState({ toggleState: tempToggleState });
    }
  }, [Object.keys(categoriesFilters).length]);

  const handleClick = (e: MouseEvent, k: string) => {
    const isMulti = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
    const previousState = Object.assign({}, categoriesFilters);
    let newState = {};

    if (categoriesFilters[k] && catState.toggleState[k]) {
      // toggled = true
      delete categoriesFilters[k];
      delete catState.toggleState[k];
      newState = catState;
    } else if (isMulti) {
      // add to selection / set toggle
      categoriesFilters[k] = true;
      newState = { ...catState.toggleState, [k]: true };
    } else {
      // delete all except clicked
      categoriesFilters = {};
      categoriesFilters[k] = true;
      newState = { [k]: true };
    }

    setCatState({ toggleState: newState });
    dispatch(setCategories(categoriesFilters, previousState));
  };

  const listCard = (o: CategorySupply) => {
    const classes = classNames("list-card-element", {
      highlight: catState.toggleState[o.name],
    });
    return (
      <div
        className={classes}
        onClick={(e: MouseEvent) => handleClick(e, o.name)}
      >
        <img src={o.imageURL} alt={o.name} style={{ height: "100%" }} />
        <span>{o.name}</span>
      </div>
    );
  };

  const updateCategories = useCallback(
    (val: string) => {
      const tempState = catState._categories.filter((cat) => {
        return cat.name.toLocaleLowerCase().includes(val);
      });
      setCatState({ categories: tempState });
    },
    [catState._categories]
  );

  const SearchCats = () => (
    /* Hijacking existing CSS for the Cat / Attr search inputs to match */
    <div className="p-tree">
      <div className="p-tree-filter-container">
        <input
          onInput={(e) =>
            updateCategories((e.target as HTMLInputElement).value)
          }
          type="text"
          className="p-tree-filter p-inputtext p-component"
          placeholder="Search list"
        />
        <span className="p-tree-filter-icon pi pi-search"></span>
      </div>
    </div>
  );

  return (
    <Panel
      header={Lang.get("categories")}
      className="filter-panel"
      toggleable={true}
    >
      <SearchCats />
      <DataView
        value={catState.categories}
        layout="grid"
        itemTemplate={listCard}
      />
    </Panel>
  );
};
export default CategoriesList;
