import React,{
     
} from 'react'

import './ProgressBar.css'


//utils function
import {getInMinutes} from '../utils/TimeFormatter'

//is the mouse down
let isMouseDown = false;

//get the position where user clicked in the progressbar
const getPos =(e)=>{
    const prefix = slider.current.getBoundingClientRect().left
    const width = slider.current.getBoundingClientRect().width
    const point_e = (parseInt((e.pageX - prefix)) / width) * 100;
    return point_e;
}

//set the new value to the progress bar


//refrence to the html elments
const slider = React.createRef()
const sliderButton = React.createRef()
const sliderBackGround = React.createRef()

export default (props)=>{
    let currentTime = props.currentTime/props.length*100;

    const totalLength = props.length

    const setProgressFromMouse = (event)=>{
        if(isMouseDown){
            const value = getPos(event)
            props.updateCurrentTime(value/100*props.length)
        }
    }
    
    //set the new value to the progress bar
    const setProgress = (value)=>{
        if(sliderButton.current){
            sliderButton.current.style.left = value + "%";
            sliderBackGround.current.style.width = value + "%";
        }
    }
    
    setProgress(currentTime)
    return(
        <div className="audio-progress">
            <div className="progress-label"> {!!currentTime ? getInMinutes(props.currentTime) : "00:00"} </div>
            <div className="slidecontainer">
                <div className="mu_progress"
                    ref={slider} 
                    // onMouseOver={(e)=>{change(e,isMouseDown)}} 
                    onMouseDown={(e)=>{isMouseDown = true;setProgressFromMouse(e)}}
                    onMouseUp={()=>{isMouseDown = false;}}
                    onMouseOver={(e)=>{setProgressFromMouse(e)}}
                >
                    <div className="progress_btn" ref={sliderButton}></div>
                    <div className="progress_bg" ref={sliderBackGround}> </div>
                </div>
            </div>
    <div className="progress-label">{!!totalLength ? getInMinutes(totalLength) : "00:00"}</div>
        </div>
    )
}