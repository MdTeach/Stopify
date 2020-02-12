import React,{useState} from 'react'

export const CardContext=React.createContext({});

export const SongDetails=({ children })=>{
    const [song,setSong]=useState([])
    const [playlistName,setPlaylistName]=useState("");
    const songInfo={
        songDetails:song,
        playlistDetails:playlistName,
        feedSong:(arrayFromCard)=>{
            setSong([arrayFromCard])
        },
        feedPlaylist:(playlistFromCard)=>{
            setPlaylistName(playlistFromCard)
        }
    }
    return(
        <CardContext.Provider value={songInfo}>
            { children }
        </CardContext.Provider>
    )
}