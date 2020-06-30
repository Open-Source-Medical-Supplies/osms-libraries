import classNames from "classnames";
import { DataView } from 'primereact/dataview';
import { Panel } from 'primereact/panel';
import React, { useEffect, useState } from "react";
import TileCard from "../../shared/components/tile-card";
import { empty, MAPPER, notEmpty } from "../../shared/utilities";

/* eslint-disable react-hooks/exhaustive-deps */
type MouseEvent = React.MouseEvent<HTMLElement>;

const CategoriesList = (
  {
    setFilterState, categoriesFilters, categories
  }: {
    setFilterState: Function,
    categoriesFilters: any,
    categories: {}[]
  }
) => {
  const [toggleState, setToggleState] = useState<{[k: string]: boolean}>({});

  categories = categories.map((c: any) => MAPPER.CategoryToJSON(c));

  useEffect(() => {
    // ensure deactivated toggles on selection-clear
    if (empty(categoriesFilters) && notEmpty(toggleState)) {
      const tempState = Object.assign({}, toggleState);
      for (const k in tempState) {
        tempState[k] = false;
      }
      setToggleState(tempState);
    }
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

  const CategoryBlock = (o: any): any => {
    const classes = classNames(
      'category-list-card p-col-6',
      { 'highlight-child': toggleState[o.name] }
    );
    return (
      <TileCard
        actionOnCard={true}
        action={(e: MouseEvent) => handleClick(e, o.name)}
        className={classes}
        header={o.name}
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
