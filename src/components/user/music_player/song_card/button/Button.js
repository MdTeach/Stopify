import React from 'react'

import PlayIcon from './Play'
import PauseIcon from './Pause'

export default (props)=>{
    const playThis = ()=>{
        props.updateCurrentMusic();
    }
    
    return(
        <button className="song-button" onClick={playThis}>
            {props.isPlaying ?  <PauseIcon/> : <PlayIcon/>}
        </button>
    );
}