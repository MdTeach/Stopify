import React,{
    useEffect,
    useState
} from 'react';

import {getTestAudio} from '../audio_utils/audio_utils'

export default ()=>{

    

    useEffect(() => {
        console.log("Loading")
        //loadSongs()
    },[]);

    return(
        <div>
            <br/>
            <br/>
            <h1>All songs</h1>
        </div>
    );
}