import React from 'react';
import '../css/searchBar.css';



export const SearchBar = (props) => {
    return(
        <div className="searchWrapper">
         <input type="text" placeholder="Search for Image" value={props.value} onKeyPress={props.enterKey} onChange={props.onChange}/>
         <span onClick={props.getValue}  className="btn">Search</span>
        </div>
    )
}