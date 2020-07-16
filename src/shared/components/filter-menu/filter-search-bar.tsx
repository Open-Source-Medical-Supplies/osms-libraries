import React from "react";
import SearchBar, { SearchBarStateChange } from "../search-bar";
import { SetFilterFn } from "./filter-menu";

export const FilterSearchBar = ({
	searchBarText,
  setFilterState,
  className
}: {
	searchBarText: string;
  setFilterState: SetFilterFn;
  className?: string;
}) => {
	const update: SearchBarStateChange = (searchState) => {
    setFilterState({
      searchBar: searchState || "",
      previousFilters: {
        searchBar: searchBarText || "",
      }
    });
  };

  return <SearchBar className={className} onStateChange={update} id="search-bar-container"/>;
};
