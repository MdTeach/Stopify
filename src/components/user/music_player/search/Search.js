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
        console.log(e.target.value);
        setQuery(newQuery);
    }

    return(
        <div className="SearchWrapper" onChange={(e)=>{handleSearch(e)}}>
            <div>Search Here</div>
            <input type="text" value={currentQuery}/>
            {/* <HorizontalContainer data={allSongs} title={"Sr"}/> */}
        </div>
    );
}