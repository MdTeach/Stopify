import React from 'react'

import './AudioController.css'
import MusicPlayer from './music_player/MusicPlayer'
import { useState } from 'react'
export default (props)=>{
    const data = props.data;
    const isDataAvialbel = Object.keys(data).length === 0 ? false : true
    const defaultUrl ="https://firebasestorage.googleapis.com/v0/b/auth-a3c8b.appspot.com/o/songs%2FMemories%20-%20Maroon%205.mp3?alt=media&token=94b50f5e-325d-4ebd-a498-1a5f084b9d4a"
    return(
        
        <div className="audio-controller">
            <MusicPlayer 
                audioInstance={!!props.audioInstance ? props.audioInstance : new Audio(defaultUrl)}
            />
        </div>
        
    );
}