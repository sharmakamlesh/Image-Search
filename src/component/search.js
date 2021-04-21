import React from 'react';
import '../css/searchBar.css';
export const SearchBar = (props) => {
    return(
        <div className="searchWrapper">
         <input type="text" placeholder="Search for Image" id="inputValue"/>
         <span onClick={props.getValue} className="btn">Search</span>
        </div>
    )
}