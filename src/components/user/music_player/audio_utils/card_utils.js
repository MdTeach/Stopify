import React,{useState} from 'react'

export const CardContext = React.createContext({});
 
export const SongDetails=({ children })=>{
    //holds the instalce of Audio
    const [audio, setAudio] = useState(null);


    //holds the information of currently playing song
    const [currentPlaying, setCurrentPlaying] = useState({});

    
    const [song,setSong]=useState([])
    const [playlistName,setPlaylistName]=useState("");

 
    //change the playing the song
    const changeMusic = newMusic => {
        if (newMusic["audioUrl"] === currentPlaying["audioUrl"]) {
            audio.paused ? audio.play() : audio.pause();
            //setCurrentPlaying({});
        } else {
            //change the music
            setCurrentPlaying(newMusic);
            //setAudio(new Audio(newMusic.audioUrl))
            audio.src = newMusic.audioUrl;
            audio.play();
        }
    };

    const songInfo={
        songDetails:song,
        playlistDetails:playlistName,
        audio:!!audio ? audio : new Audio(),
        currentPlaying,
        setAudio:(url)=>{
            setAudio(new Audio(url))
        },
        setCurrentPlaying:()=>{

        },
        //change the current music
        changeMusic:changeMusic,
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