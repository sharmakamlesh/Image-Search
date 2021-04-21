import React,{useState} from 'react';
import {SearchBar} from './search';
import {key} from '../constant'
import '../css/getImg.css'
const GetImg = () => {
    const [photo,setPhoto] = useState([])
    const [loading, setLoading] = useState(false)
    const GetInputValue = () => {
        
        let input = document.getElementById('inputValue');
       
        let url = `https://api.unsplash.com/search/photos?page=1&query=${input.value}&${key}&per_page=20`;
        console.log(url)
        if(input.value !== "") {
        setLoading(true)
        fetch(url).then(response => response.json())
        .then(res => setPhoto(res.results),setLoading(false))
        .catch(err => console.log(err))
        }
        input.value = null;
        
    }

    return(<>
         <SearchBar getValue = {() => GetInputValue()}/>
         {loading && <p>Loading...</p>}
         <div className="imgWrapper">
            {photo.map((imgs,index) =>(
                <div className="imgCard" key={index}>
                <img src={imgs.urls.small} alt="img" className="img"/>
                </div>))}
            </div>
         </>
    )
}


export default GetImg;