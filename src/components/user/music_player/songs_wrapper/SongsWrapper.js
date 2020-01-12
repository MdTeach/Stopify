import React,{
    useEffect,
    useState
} from 'react';


//functions
import {getAllSongsInfo} from '../audio_utils/audio_utils'

//components
import SongCard from '../song_card/SongCard'
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
        <div className="any" style={{background:"white"}}>
            <h1>All songs</h1>
            
            {
                //Loading data
                (isfetchingSongs === true) ? 
                    <CircularLoading/>
                :
                    (allSongs.length === 0) ?
                        <h4>No data</h4>
                    :
                        allSongs.map((data)=> <SongCard key={data["audioUrl"]} data={data} /> )
            }
        </div>
    );
}