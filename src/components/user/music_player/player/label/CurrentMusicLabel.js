import React from 'react'

import './CurrentMusicLabel.css'

export default (props)=>{
    const data = props.data;
    return(
        <div className="current-music-label">
            <div className="muic-thumb-nail-div">
                <img className="muic-thumb-nail" src={data["imageUrl"]}/>
            </div>
            <div className="labels">
                <div className="song_name">
                    {data["songName"]}
                </div>
                <div className="song_artist">
                    {data["songArtist"]}
                </div>
            </div>
        </div>
    );
}