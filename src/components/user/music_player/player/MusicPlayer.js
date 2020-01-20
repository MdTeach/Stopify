import React,{
    useEffect,
    useState
} from 'react'

//css
import './Player.css'

import CurrentMusicLabel from './label/CurrentMusicLabel'
import AudioController from './controller/AudioController'

export default (props)=>{
    const [currentPlaying, setCurrentPlaying] = useState([])
    //dummy data
    const imageData = {
        id :"id",
        songName :"Beautiful Peopple",
        songArtist :"Ed Sheran",
        imageUrl :"https://firebasestorage.googleapis.com/v0/b/auth-a3c8b.appspot.com/o/album_pic%2FLiggi%20-%20Ritviz.jpg?alt=media&token=920d6348-fb0c-485c-997e-576b5d1a97b1"
    }

    return (
        <div className="music-player">
            <div className="label">
                <CurrentMusicLabel data={imageData} className="label"/>
            </div>
            
            <div className="controller">
                <AudioController/>
            </div>
        </div>
    );
}