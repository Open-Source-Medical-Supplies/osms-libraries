import { Button } from "primereact/button";
import React from "react";
import { SetFilterFn } from "./filter-menu";

const ClearFilters = ({
  setFilterState,
  isFiltering,
  className
}: {
  setFilterState: SetFilterFn;
  isFiltering: boolean;
  className?: string;
}) => {
  const clearFilters = () =>
    setFilterState({
      nodeFilters: {},
      categoriesFilters: {},
      searchBar: "",
    });

  return <Button
    className={className}
    icon='pi pi-undo'
    disabled={!isFiltering}
    onClick={clearFilters} />;
};

export default ClearFilters;
