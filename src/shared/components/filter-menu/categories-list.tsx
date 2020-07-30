import classNames from "classnames";
import { DataView } from 'primereact/dataview';
import { Panel } from 'primereact/panel';
import React, { useEffect, useState } from "react";
import { CategorySupply } from "../../../classes/category-supply.class";
import { empty, notEmpty } from "../../utility/general.utility";
import TileCard from "../tile-card";

/* eslint-disable react-hooks/exhaustive-deps */
type MouseEvent = React.MouseEvent<HTMLElement>;
type CategoryState = {[k: string]: boolean};

const CategoriesList = (
  {
    setFilterState, categoriesFilters, categories
  }: {
    setFilterState: Function,
    categoriesFilters: any,
    categories: CategorySupply[]
  }
) => {
  const [toggleState, setToggleState] = useState<CategoryState>({});

  // ensure category list is sorted alphabetically
  categories = categories.sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    let tempState: CategoryState = {};
    // ensure deactivated toggles on selection-clear
    if (empty(categoriesFilters) && notEmpty(toggleState)) {
      tempState = Object.assign({}, toggleState);
      for (const k in tempState) {
        tempState[k] = false;
      }
    } else if ( notEmpty(categoriesFilters) ) {
      // loaded from params
      tempState = categoriesFilters;
    }
    setToggleState(tempState);
  }, [categoriesFilters])
  
  const handleClick = (e: MouseEvent, k: string) => {
    const isMulti = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
    const previousState = Object.assign({}, categoriesFilters);

    if (categoriesFilters[k] && toggleState[k]) {
      // toggled = true
      delete categoriesFilters[k];
      delete toggleState[k]
      setToggleState(toggleState);
    } else if (isMulti) {
      // add to selection / set toggle
      categoriesFilters[k] = true;
      setToggleState({...toggleState, [k]: true});
    } else {
      // delete all except clicked
      categoriesFilters = {};
      categoriesFilters[k] = true;
      setToggleState({[k]: true});
    }

    setFilterState({
      categoriesFilters,
      previousFilters: {
        categoriesFilters: previousState
      }
    });
  };

  const CategoryBlock = (o: CategorySupply): JSX.Element => {
    const classes = classNames(
      'category-list-card p-col-6',
      { 'highlight-child': toggleState[o.name] }
    );
    return (
      <TileCard
        actionOnCard={true}
        actions={[{fn: (e: MouseEvent) => handleClick(e, o.name)}]}
        className={classes}
        mainText={o.name}
        imageURL={o.imageURL}></TileCard>
    );
  };
  
  return (
    <Panel header={'Categories'} className='filter-panel' toggleable={true}>
      <DataView value={categories} layout='grid' itemTemplate={CategoryBlock} />
    </Panel>
  );
};
export default CategoriesList;
