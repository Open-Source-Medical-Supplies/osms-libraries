import { Button } from "primereact/button";
import React from "react";
import { SetFilterFn } from "./filter-menu";

const ClearFilters = ({
  setFilterState,
  isFiltering,
}: {
  setFilterState: SetFilterFn;
  isFiltering: boolean;
}) => {
  const clearFilters = () =>
    setFilterState({
      nodeFilters: {},
      categoriesFilters: {},
      searchBar: "",
    });

  return <Button icon="pi pi-undo" disabled={!isFiltering} onClick={clearFilters} />;
};

export default ClearFilters;
