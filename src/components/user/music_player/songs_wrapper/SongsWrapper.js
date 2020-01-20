import React,{
    useEffect,
    useState
} from 'react';

//css
import './SongWrapper.css'

//functions
import {getAllSongsInfo} from '../audio_utils/audio_utils'

//components
//import SongCard from '../song_card/SongCard'
import SideBar from '../side_bar/side_bar';
import MusicPlayer from '../player/MusicPlayer';
import HorizontalMusicContainer from '../horizontal_music_container/HorizontalMusicContainer'
import CircularLoading from '../../../extra/CircularLoading/CircularLoading'

export default ()=>{

    const [isfetchingSongs, setFetchingSongs] = useState(true);
    const [allSongs, setAllSongs] = useState([]);
    
    const fetchSongs = async ()=>{
        //getting the songs as array
        const songs = await getAllSongsInfo();
        
        //remove the cirucalar indicator
        setFetchingSongs(false);

        //set our songs data
        setAllSongs(songs);

        console.log(songs)
    
    }


    useEffect(() => {
        console.log("Loading")
        fetchSongs()
        //loadSongs()
    },[]);

    return(
        <div className="song-wrapper">
            <div className="sidebar-and-songs">
                <div className="side-bar">
                    <SideBar/>
                </div>
                <div className="music_lists">
                {
                    //Loading data
                    (isfetchingSongs === true) ? 
                        <CircularLoading/>
                    :
                        (allSongs.length === 0) ?
                            <h4>No data</h4>
                        :
                            <HorizontalMusicContainer data={allSongs} title="All Songs"/>
                }
                </div>
            </div>
            <div className="music-controller">
                <MusicPlayer/>
            </div>
            
        </div>
    );
}