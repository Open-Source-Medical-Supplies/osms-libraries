import React from 'react';
import { CategoryInfo } from '../../classes/category-info.class';
import { Project } from '../../classes/project.class';
import SearchBar, { SearchBarStateChange } from '../../shared/components/search-bar';

const CategorySearchBar = ({
  setState, _records
}: {
  setState: Function;
  _records: Array<Project | CategoryInfo>;
}) => {
  const update: SearchBarStateChange = (searchState) => {
    const filteredRecords = !searchState.length ?
      _records :
      _records.filter(record => record
        .displayName
        .toLowerCase()
        .includes(searchState.toLowerCase())
      );
    setState({records: filteredRecords});
  };

  return <SearchBar onStateChange={update} id='app__search-bar' />;
}

export default CategorySearchBar;
