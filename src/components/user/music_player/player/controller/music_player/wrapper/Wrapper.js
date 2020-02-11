import React,{
    useEffect,
    useState
} from 'react'


import ControlButtons from '../audio_controls/AudioControls'
import AudioProgress from '../progress_bar/ProgressBar'
import VolumeSeeker from '../volume_seeker/VolumeSeeker'

import './Wrapper.css'

export default (props)=>{
    const audio = props.audio
    
    const [currentTime,setCurrentTime] = useState(0) 
    const [currentVolume,setCurrentVolume] = useState(0);

    const handlePlayPause = ()=>{if(audio.paused){audio.play()}else{audio.pause()}}
    
    const updateCurrentTime = (newTime) =>{
        audio.currentTime = newTime;
        setCurrentTime(audio.currentTime);
    }

    const updateCurrentVolume = (newVolume)=>{
        //volume = (0,1)
        let vol = (newVolume >1 || newVolume < 0) ? 0.5 : newVolume;
        audio.volume = vol
        setCurrentVolume(audio.volume)
    }

    useEffect(() => {
        //audio.play()

        //set the current time
        setCurrentTime(audio.currentTime)
        setCurrentVolume(audio.volume)

        //add listener to the get update of each second
        audio.addEventListener("timeupdate",(e)=>{
            let newTime  = e.currentTarget.currentTime; 
            setCurrentTime(newTime)
        });
    },[audio]);
    
    return(
        <div className="wrapper">
            <div className="left-part">
                <div className="audio-control-button">
                    <ControlButtons handlePlayPause={handlePlayPause} isPaused={audio.paused}/>
                </div>
                <div className="audio-progress">
                    <AudioProgress currentTime={currentTime} length={audio.duration} updateCurrentTime={updateCurrentTime}/>
                </div>
            </div>
            <div className="right-part">
                <VolumeSeeker currentVolume={currentVolume}  updateCurrentVolume={updateCurrentVolume}/>
            </div>
        </div>
    )
}