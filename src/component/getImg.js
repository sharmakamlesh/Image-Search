import React, { useState } from "react";
import axios from 'axios';
import {Loader} from './loader/loader';
import { Error } from "./error/error";
import { SearchBar } from "./search";
import { key } from "../constant";
import "../css/getImg.css";
const GetImg = () => {
  const [photo, setPhoto] = useState([]);
  const [searchValue , setSearchValue] = useState('');
  const [loading, setLoading ] = useState(false);
  const [error , setError] = useState(false)
  const [errorTerm , setErrorTerm] = useState('')

  //===============Getting Search Term Input Value============================
  const getInputValue = (e) => {
    setError(false)
    setSearchValue(e.target.value)
  }
 
  //====================On Search Getting Images=====================================
  const onSearchHandle = (e) => {
    if(searchValue === '' || searchValue === null || searchValue === undefined){
      return;
    }
    setLoading(true)
    let url = `https://api.unsplash.com/search/photos?page=1&query=${searchValue}&${key}&per_page=30`;
    console.log(url);
    
      axios(url)
        .then((res) => {
          console.log(res.data.results)
          setPhoto(res.data.results)
          //Handling Error Unsplash Api Not Giving Error
          if(res.data.results.length === 0){
            setErrorTerm(searchValue)
            setError(true)
          }
          setLoading(false)
        })
        .catch((err) => console.log(err));

        setSearchValue('')
  };

  //====================On EnterKey Event call Search Handler===============================
  const onEnterKey = (e) => {
    if (e.key === "Enter") {
      onSearchHandle();
    }
  };

  return (
    <>
      {loading && <Loader />}
      <SearchBar getValue={() => onSearchHandle()} enterKey={onEnterKey} onChange={(e) => getInputValue(e)} value={searchValue}/>
      <div className="imgWrapper">
        {error && <Error value={errorTerm}/>}
        {photo.length > 0 && photo.map((imgs, index) => (
          <div className="imgCard" key={index}>
            <img src={imgs.urls.small} alt="img" className="img" />
          </div>
        ))}
      </div>
    </>
  );
};

export default GetImg;
