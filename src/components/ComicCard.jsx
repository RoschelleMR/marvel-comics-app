import React from 'react';

const ComicCard = ({comic}) =>{


    let poster
    let new_post_array = comic.images
    let pos_value = new_post_array[0]

    if (new_post_array.length < 1){
        // poster = Object.values(comic.thumbnail).join(".");
        // poster = require('./images/image-not-available.jpg');
        poster = "https://via.placeholder.com/800"
    }
    else{
        poster = `${pos_value.path}.${pos_value.extension}`;
    }

   
    

    return(
        <div className="comicItem">
            <div>
                <img src= {poster} alt={comic.title} />
            </div>

            <div className="comic-content">

                <div className="card-header">
                    <h3>{comic.title}</h3>
                </div>

                {comic.description

                    ?<div className="desc">
                        <p>{comic.description}</p>
                    </div>
                    
                    :null
                
                }

                <div className="seeMore">
                    <a href="#">See More</a>
                </div>
                

            </div>


            
        </div>
    )
}

export default ComicCard