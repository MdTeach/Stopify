import React,{useState} from 'react'

import PlayIcon from './Play'
import PauseIcon from './Pause'

export default (props)=>{
    const [isPaused,setPause] = useState(props.isPaused)

    const handleClick = ()=>{
        props.handleClick();
        setPause(isPaused ? false :true)
    }
    
    return(
        <button className="song-button" onClick={handleClick}>
            {(!isPaused && props.isPlaying) ?  <PauseIcon/> : <PlayIcon/>}
        </button>
    );
}