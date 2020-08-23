import classNames from "classnames";
import { DataView } from "primereact/dataview";
import { Panel } from "primereact/panel";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { DispatchFilterAction } from "../../../redux/filter.reducer";
import { useTypedSelector } from "../../../redux/root.reducer";
import { CategorySupply } from "../../classes/category-supply.class";
import { FILTER_ACTIONS } from "../../constants/filter.constants";
import { TABLE_MAPPING } from "../../constants/general.constants";
import { empty, notEmpty } from "../../utility/general.utility";
import TileCard from "../tile-card";
import './_category-list.scss';
import { getLang } from "../../utility/language.utility";

/* eslint-disable react-hooks/exhaustive-deps */
type MouseEvent = React.MouseEvent<HTMLElement>;
type CategoryState = { [k: string]: boolean };

const CategoriesList = () => {
  const categories = useRef<CategorySupply[]>([]);
  const [ toggleState, setToggleState ] = useState<CategoryState>({});
  const dispatch = useDispatch<DispatchFilterAction>();
  const { tables, filter } = useTypedSelector(({ tables, filter }) => ({
    tables,
    filter,
  }));
  let { categoriesFilters } = filter;
  const Lang = getLang();

  useEffect(() => {
    if (tables.completed) {
      categories.current = (tables.loaded[
        TABLE_MAPPING.CategorySupply
      ] as CategorySupply[]).sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [tables.completed]);

  useEffect(() => {
    let tempState: CategoryState = {};
    // ensure deactivated toggles on selection-clear
    if (empty(categoriesFilters) && notEmpty(toggleState)) {
      tempState = Object.assign({}, toggleState);
      for (const k in tempState) {
        tempState[k] = false;
      }
    } else if (notEmpty(categoriesFilters)) {
      // loaded from params
      tempState = categoriesFilters;
    }
    setToggleState(tempState);
  }, [categoriesFilters]);

  const handleClick = (e: MouseEvent, k: string) => {
    const isMulti = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
    const previousState = Object.assign({}, categoriesFilters);
    let newState = {};

    if (categoriesFilters[k] && toggleState[k]) {
      // toggled = true
      delete categoriesFilters[k];
      delete toggleState[k];
      newState = toggleState;
    } else if (isMulti) {
      // add to selection / set toggle
      categoriesFilters[k] = true;
      newState = { ...toggleState, [k]: true };
    } else {
      // delete all except clicked
      categoriesFilters = {};
      categoriesFilters[k] = true;
      newState = { [k]: true };
    }
    setToggleState(newState)
    dispatch({
      type: FILTER_ACTIONS.SET_FILTER,
      payload: {
        categoriesFilters: categoriesFilters,
        previousFilters: {
          categoriesFilters: previousState,
        },
      },
    });
  };

  const CategoryBlock = (o: CategorySupply): JSX.Element => {
    const classes = classNames("category-list-card p-col-6", {
      "highlight-child": toggleState[o.name],
    });

    return (
      <TileCard
        actionOnCard={true}
        actions={[{ fn: (e: MouseEvent) => handleClick(e, o.name) }]}
        className={classes}
        mainText={o.name}
        imageURL={o.imageURL}
      ></TileCard>
    );
  };

  return (
    <Panel header={Lang.get('categories')} className="filter-panel" toggleable={true}>
      <DataView
        value={categories.current}
        layout="grid"
        itemTemplate={CategoryBlock}
      />
    </Panel>
  );
};
export default CategoriesList;
