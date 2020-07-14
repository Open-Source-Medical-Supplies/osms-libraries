import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
/* eslint-disable react-hooks/exhaustive-deps */

export type SearchBarStateChange = (searchState: string) => any;

const SearchBar = (props: {
  onStateChange: SearchBarStateChange;
  providedStr?: string;
  id?: string;
  className?: string;
}) => {
	const [searchState, setSearchState] = useState('');

	useEffect(() => {
    if (!!searchState && searchState.length) {
      props.onStateChange(searchState);
    }
  }, [ searchState ]);
	useEffect(() => {
		// value provided is empty but the internal state is not => reset
		if (props.providedStr && !props.providedStr.length && searchState.length > 1) {
			setSearchState('');
		}
  }, [props.providedStr]);
  
	return (
		<div id={props.id || "search-bar"} className={(props.className || '') + " search-bar sticky-top-0"} style={{ zIndex: 20 }}>
			<span className="p-float-label">
				<label htmlFor="searchBar">{searchState.length ? "" : "Search"}</label>
				<InputText
					id="searchBar"
					style={{ width: "100%" }}
					onChange={(e: any) => setSearchState(e.target.value)}
					value={searchState}
				></InputText>
			</span>
		</div>
	);
};

export default SearchBar;
