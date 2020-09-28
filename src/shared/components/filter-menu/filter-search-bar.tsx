import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../redux/root.reducer";
import SearchBar, { SearchBarStateChange } from "../search-bar";
import { setSearchBar } from '../../../redux/actions/filter.action';

export const FilterSearchBar = ({ className }: { className?: string }) => {
  const searchBarText = useTypedSelector(({ filter }) => filter.searchBar);

  const dispatch = useDispatch();
  const update: SearchBarStateChange = searchState => dispatch(setSearchBar(searchState));

  return (
    <SearchBar
      providedStr={searchBarText}
      className={className || ''}
      onStateChange={update}
      id="search-bar-container"
    />
  );
};
