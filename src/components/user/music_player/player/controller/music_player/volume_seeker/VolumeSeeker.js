import React,{
     
} from 'react'

import './VolumeSeeker.css'

//is the mouse down
let isMouseDown = false;

//get the position where user clicked in the progressbar
const getPos =(e)=>{
    const prefix = slider.current.getBoundingClientRect().left
    const width = slider.current.getBoundingClientRect().width
    const point_e = (parseInt((e.pageX - prefix)) / width) * 100;
    return point_e;
}

//refrence to the html elments
const slider = React.createRef()
const sliderButton = React.createRef()
const sliderBackGround = React.createRef()

export default (props)=>{
    let currentVolume = !!props.currentVolume ? props.currentVolume*100 :50
    
    //set new value from the mouse ip
    const setProgressFromMouse = (event)=>{
        if(isMouseDown){
            const value = getPos(event)
            props.updateCurrentVolume(value/100)
        }
    }
    
    //set the new value to the progress bar
    const setProgress = (value)=>{
        if(sliderButton.current){
            sliderButton.current.style.left = value + "%";
            sliderBackGround.current.style.width = value + "%";
        }
    }

    setProgress(currentVolume)
    return(
        <div className="audio-progress">
            <div className="progress-label"> icon </div>
            <div className="slidecontainer">
                <div className="vo_progress"
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
        </div>
    )
}