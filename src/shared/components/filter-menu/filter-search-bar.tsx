import React from "react";
import SearchBar, { SearchBarStateChange } from "../search-bar";
import { SetFilterFn } from "./filter-menu";

export const FilterSearchBar = ({
	searchBarText,
	setFilterState,
}: {
	searchBarText: string;
	setFilterState: SetFilterFn;
}) => {
	const update: SearchBarStateChange = (searchState) => {
    setFilterState({
      searchBar: searchState || "",
      previousFilters: {
        searchBar: searchBarText || "",
      }
    });
  };

  return <SearchBar onStateChange={update} id="search-bar-container"/>;
};
