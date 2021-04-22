import React, { useState } from "react";
import { SearchBar } from "./search";
import { key } from "../constant";
import "../css/getImg.css";
const GetImg = () => {
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(false);
  const GetInputValue = (e) => {
    let input = document.getElementById("inputValue");
    let url = `https://api.unsplash.com/search/photos?page=1&query=${input.value}&${key}`;
    console.log(url);
    if (input.value !== "") {
      fetch(url)
        .then((response) => response.json())
        .then((res) => setPhoto(res.results))
        .catch((err) => console.log(err));
    }
    input.value = null;
  };

  const onEnterKey = (e) => {
    if (e.key === "Enter") {
      GetInputValue();
    }
  };

  return (
    <>
      <SearchBar getValue={() => GetInputValue()} enterKey={onEnterKey} />
      {}
      {loading ? <p>Loading...</p> : null}
      <div className="imgWrapper">
        {photo.length === 0 ? (
          <div>
            <h2>Not Found Any Images!!</h2>
            <h3>Search for Photos </h3>
          </div>
        ) : null}
        {photo.map((imgs, index) => (
          <div className="imgCard" key={index}>
            <img src={imgs.urls.small} alt="img" className="img" />
          </div>
        ))}
      </div>
    </>
  );
};

export default GetImg;
