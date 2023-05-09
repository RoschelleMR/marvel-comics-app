import React from "react";

import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';

// ----------------------------NOTES ---------------------------
// Main-Notes: 1. To implement displaying the info in the modal
//             2. Need to style Modal
// ------------------------END OF NOTES--------------------------

const getAPI = (id) => {
    console.log(id)
    let apiKey = "7b45859751cc84dd3b3ac7739c05a138"
    let privateKey = "f85c0a29b5716efc5b61124f138a423330dd23a2"
    let ts = Date.now().toString();
    let toBeHashed = ts+privateKey+apiKey
    let hash = CryptoJS.MD5(toBeHashed)
  
    const API_URL = `https://gateway.marvel.com/v1/public/comics?id=${id}&ts=${ts}&apikey=${apiKey}&hash=${hash}`;
    return API_URL
  
  }

const Modal = ({selected}) => {

    const [comic, setComic] = useState([]);

    const findComic = async (selected) => {

        const response = await fetch(`${getAPI(selected)}`);
        const data = await response.json();
    
        let comicObjects = data.data.results
    
        console.log(comicObjects)
    
        setComic(comicObjects);
      }

    
    useEffect(() => {

        if (selected != null){
            findComic(selected);   
        }
        
      }, [selected]);

      
    return(

        <div className="modal_container">
            <div className="overlay"></div>
            <div className="modal-content">
                <p>{selected}</p>
            </div>
        </div>

    )

}


export default Modal;