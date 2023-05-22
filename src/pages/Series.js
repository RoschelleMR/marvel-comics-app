import React from "react";
import { useParams } from 'react-router-dom'

import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';

import ComicCard from "../components/ComicCard";
import Modal from "../components/Modal";
import '../assets/css/Series.css'

const getComicsAPI = (seriesID) => {

    let apiKey = "7b45859751cc84dd3b3ac7739c05a138"
    let privateKey = "f85c0a29b5716efc5b61124f138a423330dd23a2"
    let ts = Date.now().toString();
    let toBeHashed = ts+privateKey+apiKey
    let hash = CryptoJS.MD5(toBeHashed)
  
    const API_URL = `https://gateway.marvel.com/v1/public/series/${seriesID}/comics?noVariants=true&limit=100&ts=${ts}&apikey=${apiKey}&hash=${hash}`;
    return API_URL
}

const getSeriesAPI = (seriesID) => {

    let apiKey = "7b45859751cc84dd3b3ac7739c05a138"
    let privateKey = "f85c0a29b5716efc5b61124f138a423330dd23a2"
    let ts = Date.now().toString();
    let toBeHashed = ts+privateKey+apiKey
    let hash = CryptoJS.MD5(toBeHashed)
  
    const API_URL = `https://gateway.marvel.com/v1/public/series?id=${seriesID}&ts=${ts}&apikey=${apiKey}&hash=${hash}`;
    return API_URL
}



function Series() {
    let { id } = useParams();
    let seriesID = id;
    let thumbnail


    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const [comics, setComics] = useState([]);
    const [series, setSeries] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        
        getSeries(seriesID);
        getComics(seriesID);
    }, [seriesID])


    const getComics = async (seriesID) => {

        const response = await fetch(`${getComicsAPI(seriesID)}`);
        const data = await response.json();

        let comicObjects = data.data.results

        setComics(comicObjects);

    }

    const getSeries = async (seriesID) => {

        const response = await fetch(`${getSeriesAPI(seriesID)}`);
        const data = await response.json();

        let seriesObjects = data.data.results.at(0)

        setSeries(seriesObjects)
    }

    const getThumbanil = () =>{

        if (series.length !== 0) {
            
            let tempThumbnail = series.thumbnail

            thumbnail = `${tempThumbnail.path}.${tempThumbnail.extension}`;
            

            return thumbnail
        }
        
    }

    const getLastModified = () =>{

        let date = new Date(series.modified)

        let longDate = date.toLocaleDateString("en", {
            year: "numeric",
            day: "2-digit",
            month: "long",
            });

        return longDate;
    }

    const getNumComics = () =>{
        if (series.length !== 0) {
            return series.comics.available;
        }
        
    }

    

    const toggleModal = () => {

        setModal(!modal);
        
    };

    // receives value from Modal component to change
    // value of App.js modal state
    const updateProps = (newValue) => {
        
        setModal(newValue);
        setSelected(null);
    
    };




    console.log(comics)
    console.log('The series',series)

    
    

    return(
        <>
            <Modal updateProps={updateProps} modalState= {modal} id={selected} />
            <div className="series-container">
                <div className="top">
                    
                        <img src={getThumbanil()} alt="series thumbnail" />
                    
                    <div className="top-info">

                        <div className="title">
                            <h2>{series.title}</h2>
                        </div>

                        <div className="modified-box">
                            <h3>Last Modified:</h3>
                            <p>{getLastModified()}</p>
                        </div>

                        <div className="comics-box">
                            <h3>Comics:</h3>
                            <p>{getNumComics()}</p>
                        </div>
                                              
                    </div>
                    
                </div>
                {comics.length !== 0 ?(
                    
                    <div className="main-container">
                        {comics.map((comic) => (
                            <div onClick={() => {setSelected(comic.id); toggleModal()}}>
                                <ComicCard comic={comic}/>
                            </div>
                        ))}
                    </div>
                ):(
                    <p>No comics for that series</p>
                )}
            </div>

        </>
    )
}

export default Series;