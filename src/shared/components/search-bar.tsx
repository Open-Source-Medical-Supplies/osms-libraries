import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { CategoryInfoType } from '../../classes/category-info.class';
import { ProjectType } from '../../classes/project.class';

const SearchBar = ({setState, _records}: {setState: Function, _records: Array<ProjectType | CategoryInfoType>}) => {
  const [searchState, setSearchState] = useState('');
  const onInputChange = (e: any) => setSearchState((e.target as HTMLInputElement).value); // PrimeReact is not typed well here it seems.
  
  useEffect(() => {
    const filteredRecords = !searchState.length ? _records : _records.filter(record => {
      const { categoryName } = record;
      return categoryName.toLowerCase().includes(searchState.toLowerCase())
    });
    setState({records: filteredRecords});
  }, [searchState]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id='app__search-bar' className='sticky-top-0' style={{zIndex: 10}}>
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

export default SearchBar;
