import React from 'react'
import {Route} from 'react-router-dom'
import {NavLink} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import Playlist from './playlist/playlist'
import LikedSongs from './likedSongs/likedSongs'



const useStyles=makeStyles({
    navLink:{
    marginLeft:35,
    color:"gray",
    fontSize:17,
    '&:hover':{
        color:"white",
    }
   },
    chosen:{
        color:"white",
        borderBottom:" 2px solid #1ed760 ",
        '&:hover':{
            color:"white"
        }
    }
})

export default ()=>{
    const classes=useStyles()
    return(
        <div style={{color:"white",paddingTop:"20px"}}>
            <div classes={classes.appBar}>
                <NavLink exact to="/library" style={{textDecoration:"none"}} className={classes.navLink} activeClassName={classes.chosen} >Playlists</NavLink>
                <NavLink to="/library/likedSongs" style={{textDecoration:"none"}} className={classes.navLink} activeClassName={classes.chosen}>Liked Songs</NavLink>
            </div>
            <div style={{paddingTop:"30px"}}>
                <Route exact path="/library" component={Playlist}/>
                <Route path="/library/likedSongs" component={LikedSongs}/>
            </div>
        </div>
    )
}