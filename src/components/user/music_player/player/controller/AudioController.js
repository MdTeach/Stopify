import React from 'react'

import './AudioController.css'
import MusicPlayer from './music_player/MusicPlayer'
export default (props)=>{
    const data = props.data;
    const isDataAvialbel = Object.keys(data).length === 0 ? false : true
    return(
        
        <div className="audio-controller">
            {/* {(isDataAvialbel) ? "Play "+data["audioUrl"] :""} */}
            <MusicPlayer audioUrl={data["audioUrl"]}/>
        </div>
        
    );
}