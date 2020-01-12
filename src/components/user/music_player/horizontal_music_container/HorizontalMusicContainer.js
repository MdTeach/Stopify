import React from 'react'
import './HorizontalMusicContainer.css'

import SongCard from '../song_card/SongCard';

export default (props)=>{
    return(
        <div className="horizontal-container">
        <div className="title">{props.title}</div>
            <div className="card-container">
            {props.data.map((data)=> <SongCard key={data["audioUrl"]} data={data} /> )}
            </div>
        </div>
    )
}