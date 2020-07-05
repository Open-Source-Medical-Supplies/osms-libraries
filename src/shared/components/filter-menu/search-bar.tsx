import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState, useCallback } from 'react';
import { SetFilterFn } from './filter-menu';

export const SearchBar = ({
  searchBarText, setFilterState
}: {
  searchBarText: string;
  setFilterState: SetFilterFn;
}) => {
  const [searchState, setSearchState] = useState('');
  const onInputChange = (e: any) => setSearchState(e.target.value);
  
  const update = useCallback(() => {
    setFilterState({
      searchBar: searchState || '',
      previousFilters: {
        searchBar: searchBarText || ''
      }
    }
  )}, [searchState]); // eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(() => update(), [ searchState, update ]);
  useEffect(() => {
    if (!searchBarText.length && searchState.length > 1) {
      setSearchState('');
    } 
  }, [[searchBarText]]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id='search-bar-container' style={{zIndex: 10}}>
      <span className='p-float-label'>
        <label htmlFor='searchBar'>{searchState.length ? '' : 'Search'}</label>
        <InputText id='searchBar'
          style={{width: '100%'}}
          onChange={onInputChange}
          value={searchState}></InputText>
      </span>
    </div>
  )
}