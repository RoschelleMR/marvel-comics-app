import React from 'react'
import { useEffect, useState } from 'react';

import CryptoJS from 'crypto-js';
import ComicCard from './components/ComicCard';
import AppHeader from './components/AppHeader';

import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'



const getAPI = (title) => {
  let apiKey = "7b45859751cc84dd3b3ac7739c05a138"
  let privateKey = "f85c0a29b5716efc5b61124f138a423330dd23a2"
  let ts = Date.now().toString();
  let toBeHashed = ts+privateKey+apiKey
  let hash = CryptoJS.MD5(toBeHashed)

  const API_URL = `https://gateway.marvel.com/v1/public/comics?title=${title}&ts=${ts}&apikey=${apiKey}&hash=${hash}&limit=50`;
  return API_URL

}


function App() {

  const [comics, setComics] = useState([])
  const [searchTerm, setSearchTerm] = useState('')


  const searchComics = async (title) => {

    const response = await fetch(`${getAPI(title)}`);
    const data = await response.json();

    let comicObjects = data.data.results

    console.log(comicObjects)

    setComics(comicObjects);
  }

  useEffect(() => {
    searchComics('Blade');
  }, [])

  
  //example comic object for reference
  let comic1 = {
    "id": 53251,
    "digitalId": 0,
    "title": "Hulk (2014) #16 (Yu Variant)",
    "issueNumber": 16,
    "variantDescription": "Yu Variant",
    "description": "HULK-SIZED GRAND FINALE TO \"THE OMEGA HULK\" EPIC!!! - The HULK confrontation you've been waiting for: DOC GREEN VS JEN WALTERS - What is Doc Green's startling confession??? - And...the return of BETTY ROSS?!? - PLUS: the reveal of LYRA THE SAVAGE SHE-HULK'S fate!",
    "modified": "2015-05-04T11:42:22-0400",
    "isbn": "",
    "upc": "75960608056401621",
    "diamondCode": "MAR150756",
    "ean": "",
    "issn": "",
    "format": "Comic",
    "pageCount": 40,
    "textObjects": [
        {
            "type": "issue_solicit_text",
            "language": "en-us",
            "text": "HULK-SIZED GRAND FINALE TO \"THE OMEGA HULK\" EPIC!!! - The HULK confrontation you've been waiting for: DOC GREEN VS JEN WALTERS - What is Doc Green's startling confession??? - And...the return of BETTY ROSS?!? - PLUS: the reveal of LYRA THE SAVAGE SHE-HULK'S fate!"
        }
    ],
    "resourceURI": "http://gateway.marvel.com/v1/public/comics/53251",
    "urls": [
        {
            "type": "detail",
            "url": "http://marvel.com/comics/issue/53251/hulk_2014_16_yu_variant/yu_variant?utm_campaign=apiRef&utm_source=7b45859751cc84dd3b3ac7739c05a138"
        }
    ],
    "series": {
        "resourceURI": "http://gateway.marvel.com/v1/public/series/18834",
        "name": "Hulk (2014 - 2015)"
    },
    "variants": [
        {
            "resourceURI": "http://gateway.marvel.com/v1/public/comics/51967",
            "name": "Hulk (2014) #16"
        }
    ],
    "collections": [],
    "collectedIssues": [],
    "dates": [
        {
            "type": "onsaleDate",
            "date": "2015-05-06T00:00:00-0400"
        },
        {
            "type": "focDate",
            "date": "2015-04-22T00:00:00-0400"
        }
    ],
    "prices": [
        {
            "type": "printPrice",
            "price": 4.99
        }
    ],
    "thumbnail": {
        "path": "http://i.annihil.us/u/prod/marvel/i/mg/3/e0/55479132a78cf",
        "extension": "jpg"
    },
    "images": [
        {
            "path": "http://i.annihil.us/u/prod/marvel/i/mg/3/e0/55479132a78cf",
            "extension": "jpg"
        }
    ],
    "creators": {
        "available": 3,
        "collectionURI": "http://gateway.marvel.com/v1/public/comics/53251/creators",
        "items": [
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/creators/87",
                "name": "Mark Bagley",
                "role": "artist"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/creators/11680",
                "name": "Gerry Duggan",
                "role": "writer"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/creators/758",
                "name": "Leinil Francis Yu",
                "role": "penciller (cover)"
            }
        ],
        "returned": 3
    },
    "characters": {
        "available": 0,
        "collectionURI": "http://gateway.marvel.com/v1/public/comics/53251/characters",
        "items": [],
        "returned": 0
    },
    "stories": {
        "available": 2,
        "collectionURI": "http://gateway.marvel.com/v1/public/comics/53251/stories",
        "items": [
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/117938",
                "name": "cover from Hulk (2014) #16 (YU VARIANT)",
                "type": "cover"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/117939",
                "name": "story from Hulk (2014) #16 (YU VARIANT)",
                "type": "interiorStory"
            }
        ],
        "returned": 2
    },
    "events": {
        "available": 0,
        "collectionURI": "http://gateway.marvel.com/v1/public/comics/53251/events",
        "items": [],
        "returned": 0
    }
}



  return (
    <div className="App">
     
      <AppHeader/>

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

          

          {/* <div className="search-image">
            <img 
              className='search-icon'
              src={SearchIcon}
              alt="Search Icon"
              onClick={() => {searchComics(searchTerm)}}
            />
          </div> */}

        </div>
      </div>

        

      {
        comics.length !== 0

        ?(
          <div className="main-container">
            {comics.map((comic) => (
              <ComicCard comic={comic} />
            ))}
        
          </div>
        )

        :(
          <h3>Comic Not Found</h3>
        )
      }

    </div>
  );
}

export default App;
