import React from 'react';

const ComicCard = ({comic}) =>{


    let poster = Object.values(comic.thumbnail).join(".");

    return(
        <div className="comic">
            <div>
                <img src= {poster} alt={comic.title} />
            </div>

            <div>
                <h3>{comic.title}</h3>
            </div>
            
        </div>
    )
}

export default ComicCard