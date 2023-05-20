import React from 'react'
import { useEffect, useState } from 'react';

import CryptoJS from 'crypto-js';

import Modal from '../components/Modal'
import ComicCard from '../components/ComicCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


const getAPI = (title) => {
    let apiKey = "7b45859751cc84dd3b3ac7739c05a138"
    let privateKey = "f85c0a29b5716efc5b61124f138a423330dd23a2"
    let ts = Date.now().toString();
    let toBeHashed = ts+privateKey+apiKey
    let hash = CryptoJS.MD5(toBeHashed)
  
    const API_URL = `https://gateway.marvel.com/v1/public/comics?noVariants=true&title=${title}&ts=${ts}&orderBy=-focDate&apikey=${apiKey}&hash=${hash}&limit=50`;
    return API_URL
  
  }


function Home() {

    const [comics, setComics] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selected, setSelected] = useState(null);

    const [modal, setModal] = useState(false);
    


    const searchComics = async (title) => {

        const response = await fetch(`${getAPI(title)}`);
        const data = await response.json();

        let comicObjects = data.data.results

        console.log(comicObjects)

        setComics(comicObjects);
    }

    useEffect(() => {
        searchComics('Captain America');
    }, [])

    const toggleModal = () => {

        setModal(!modal);
        
    };

    // receives value from Modal component to change
    // value of App.js modal state
    const updateProps = (newValue) => {
        
        setModal(newValue);
        setSelected(null);
    
    };




    return(
        <>
            <Modal updateProps={updateProps} modalState= {modal} id={selected} />
            <div className="search-container">

                <div className="search-box">

                <FontAwesomeIcon 
                    className='search-icon'
                    icon={faSearch}
                    alt="Search Icon"
                    onClick={() => {searchComics(searchTerm)}} 
                />

                <input
                    type="text"
                    placeholder="Search for a comic"
                    value= {searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter'){
                        searchComics(searchTerm)
                    }
                    
                    }}
                />
                </div>
            </div>



            {
                comics.length !== 0

                ?(
                <div className="main-container">
                    {comics.map((comic) => (
                    <div onClick={() => {setSelected(comic.id); toggleModal(); }}>
                        <ComicCard comic={comic}/>
                    </div>
                    
                    ))}

                </div>
                )

                :(
                <h3>Comic Not Found</h3>
                )
            }

        </>
    )
}

export default Home