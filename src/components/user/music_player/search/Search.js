import React,{useState} from 'react'

//componets
import HorizontalContainer from '../horizontal_music_container/HorizontalMusicContainer'

//css
import './Search.css'

export default (props)=>{
    const allSongs = props.allSongs
    
    const [currentQuery,setQuery] = useState("")
    const [songArrayByNames, setsongArrayByNames] = useState([])
    const [songArrayByArtist, setsongArrayByArtist] = useState([])

    const handleSearch = (e)=>{
        const newQuery = e.target.value;
        setQuery(newQuery);
        if(newQuery.trim() !== ""){
            let q = newQuery.toLowerCase();
            
            //filter by song name
            const nameFilter = allSongs.filter(
                el => el["name"].toLowerCase().search(q) > -1
            );
            setsongArrayByNames(nameFilter)
            
            //filter the artist name
            const artistFilter = allSongs.filter(
                el => el["artist"].toLowerCase().search(q) > -1
            );
            setsongArrayByArtist(artistFilter)
        }
    }

    return(
        <div className="SearchWrapper" onChange={(e)=>{handleSearch(e)}}>
            <div>Search Here</div>
            <input type="text" value={currentQuery}/>
            
            {
                (currentQuery.trim() == "") ? 
                    <div><h3>Search for artist, song</h3></div>
                    :
                    (songArrayByNames.length > 0 || songArrayByNames > 0)?
                        <div>
                        <HorizontalContainer data={songArrayByNames} title={"By Song Name"}/>
                        <HorizontalContainer data={songArrayByArtist} title={"By Artist"}/>
                        </div>
                    :
                    <div><h3>No results found for {currentQuery}</h3></div>

            }
        </div>
    );
}