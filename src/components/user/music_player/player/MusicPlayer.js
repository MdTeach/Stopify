import React,{
    useEffect,
    useState
} from 'react'

//css
import './Player.css'

import CurrentMusicLabel from './label/CurrentMusicLabel'
import AudioController from './controller/AudioController'

export default (props)=>{
    const musicData = props.currentPlaying

    return (
        <div className="music-player">
            <div className="label">
                <CurrentMusicLabel data={musicData} className="label"/>
            </div>
            
            <div className="controller">
                <AudioController data={musicData}/>
            </div>
        </div>
    );
}