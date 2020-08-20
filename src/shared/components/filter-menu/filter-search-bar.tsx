import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../redux/root.reducer";
import { FILTER_ACTIONS } from "../../constants/filter.constants";
import SearchBar, { SearchBarStateChange } from "../search-bar";

export const FilterSearchBar = ({ className }: { className?: string }) => {
  const searchBarText = useTypedSelector(({ filter }) => filter.searchBar);

  const dispatch = useDispatch();
  const update: SearchBarStateChange = (searchState) => {
    dispatch({
      type: FILTER_ACTIONS.SET_FILTER,
      payload: {
        searchBar: searchState || "",
        previousFilters: {
          searchBar: searchBarText || "",
        },
      },
    });
  };

  return (
    <SearchBar
      providedStr={searchBarText}
      className={className || ''}
      onStateChange={update}
      id="search-bar-container"
    />
  );
};
