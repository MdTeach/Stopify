import React from 'react'

import './CurrentMusicLabel.css'

export default (props)=>{
    const data = props.data;
    const isDataAvialbel = Object.keys(data).length === 0 ? false : true
    return(
        (!isDataAvialbel)
        //no song is selected
        ?
            <div></div>
        :
        <div className="current-music-label">
            <div className="muic-thumb-nail-div">
                <img className="muic-thumb-nail"alt={data["imageUrl"]} src={data["imageUrl"]}/>
            </div>
            <div className="labels">
                <div className="song_name">
                    {data["name"]}
                </div>
                <div className="song_artist">
                    {data["artist"]}
                </div>
            </div>
        </div>
    );
}