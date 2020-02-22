import React,{useState} from 'react'

//componets
import HorizontalContainer from '../horizontal_music_container/HorizontalMusicContainer'

//css
import './Search.css'
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#ffffff",
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '6   0%',
        fontSize:"3em",
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:"3em",
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        fontSize:"3em",
    },
}))



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
            console.log(setsongArrayByArtist)
            const artistFilter = allSongs.filter(
                el => el["artist"].toLowerCase().search(q) > -1
            );
            setsongArrayByArtist(artistFilter)
        }
    }

    const classes = useStyles();


    return(
        <div className="SearchWrapper" >
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search …"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    value={currentQuery}
                    onInput={(e)=>{handleSearch(e)}}
                    value={currentQuery}
                />
            </div>
            
            {
                (currentQuery.trim() == "") ? 
                    <div className="notFoundLabel"><h1>Search for artist, song</h1></div>
                    :
                    (songArrayByNames.length > 0 || songArrayByNames > 0)?
                        <div>
                        <HorizontalContainer data={songArrayByNames} title={"By Song Name"}/>
                        <HorizontalContainer data={songArrayByArtist} title={"By Artist"}/>
                        </div>
                    :
                    <div className="notFoundLabel">
                        <h1>No results found for {currentQuery}</h1>
                        <h3>Please make sure your words are spelled correctly or use less or different keywords.</h3>
                    </div>

            }
        </div>
    );
}