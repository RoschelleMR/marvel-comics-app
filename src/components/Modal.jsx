import React from "react";

import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';

import '../assets/css/Modal.css'

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

const Modal = ({updateProps, modalState, id}) => {

    let poster
    let new_post_array
    let pos_value
    let dates
    let published

    console.log(modalState, id)

    const [comic, setComic] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (id != null && modalState===true){
            findComic(id);
        }
        
      }, [id, modalState]);
    
      
    

    const findComic = async (id) => {

        setLoading(true);

        try {
            const response = await fetch(`${getAPI(id)}`);
            const data = await response.json();
        
            let comicObjects = data.data.results[0]
        
            setComic(comicObjects);
            setLoading(false);
        }
        catch (err) {
            setLoading(false);
          }  
      }

    const closeModal = () => {

        updateProps(false);
        setComic([])
        
    }


      

    if(modalState === true){

        if (Object.keys(comic).length > 0){

            new_post_array = comic.images
            pos_value = new_post_array.at(0)
    
            dates = comic.dates
            published = new Date(dates.at(0).date)
            console.log(published)
    
            // setting up poster img src
            if (new_post_array.length !== 0){
                poster = `${pos_value.path}.${pos_value.extension}`;
            }
            else{
                

                poster = "https://via.placeholder.com/800"
            }
        }


        document.body.classList.add('active-modal')


        
    }
    else{
        document.body.classList.remove('active-modal')
    }

      console.log('logging comic',comic)

      
    return(
        <>
            {loading === false && modalState && (comic.length !== 0) && (
                <div className="modal">
                    <div className="overlay" onClick={() => closeModal()}></div>
                    <div className="modal-content">
                        <div className="poster-box">
                            <img src= {poster} alt={comic.title} />
                        </div>
                        <div className="comicInfo-box">
                            <div className="header">
                                <h2>{comic.title}</h2>
                            </div>
                            <div className="desc">
                                <p>{comic.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>

    )

}


export default Modal;