import React from 'react';
import {NavLink} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'


const useStyles=makeStyles({
   cardHolder:{
    display:"flex",
    flexDirection:"column",
    marginLeft:"3.8em"
   },
    card:{
        color:"gray",
        '&:hover':{
            color:"white",
        }
    },
    activeCard:{
        color:"white",
        '&:hover':{
            color:"white",
        }
    }
})

export default (props)=>{
    const classes=useStyles();
    return(
        <div className={classes.cardHolder}>
        <NavLink to={"/library/playlist/"+props.data.playlistName} style={{textDecoration:"none"}} className={classes.card} activeClassName={classes.activeCard}>{props.data["playlistName"]}</NavLink>
        </div>
    )
}