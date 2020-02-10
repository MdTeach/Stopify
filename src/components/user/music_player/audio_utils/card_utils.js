import React,{useState} from 'react'

export const CardContext=React.createContext({});

export const SongDetails=({ children })=>{
    const [song,setSong]=useState([])
    const songInfo={
        songDetails:song,
        feedSong:(arrayFromCard)=>{
            setSong([arrayFromCard])
        }
    }
    return(
        <CardContext.Provider value={songInfo}>
            { children }
        </CardContext.Provider>
    )
}