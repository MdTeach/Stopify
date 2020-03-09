import React,{useState} from 'react'
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {makeStyles} from '@material-ui/core/styles'
import {FireStore as db} from '../../../../utils/firebase'


const useStyles=makeStyles({
        iconHolder:{
            height:"9em",
            width:"10em",
            backgroundColor:"#363636",
            alignItems:"center",
            marginLeft:5,
            marginRight:5,
            position:"relative"
        },
        icon:{
            marginLeft:"38px",
            marginTop:"38px",
            fontSize:80,
            color:"white"
        },
        playlistName:{
            textAlign:"center",
            color:"white",
            fontFamily:"Arial"
        },
        addTo:{
            position:"absolute",
            height:"9em", 
            width:"10em",
            backgroundColor:"#454545",
            cursor:"pointer"
        },
        addIcon:{
            fontSize:50,
            color:"white",
            marginLeft:"55px",
            marginTop:"52px"
        }
})





export default (props)=>{
    const classes=useStyles();
    const [over,setOver]=useState(false)
    
    
    const addToPlaylist=()=>{
        props.check();
        props.handler();
        
        db.collection("playlistSong").add({
            album:props.songs["album"],
            artist:props.songs["artist"],
            audioUrl:props.songs["audioUrl"],
            genre:props.songs["genre"],
            imageUrl:props.songs["imageUrl"],
            name:props.songs["name"],
            uid:props.currentUser.uid,
            playlistName:props.data["playlistName"]
        })
        .then((docRef)=>{
            console.log("song added to playlist",docRef.id)
        })
        .catch((error)=>{
            console.log("error",error)
        })
    }

    return(
        <div>
            <div className={classes.iconHolder} onMouseOver={()=>{setOver(true)}} onMouseLeave={()=>{setOver(false)}}>
               {over && <div className={classes.addTo} onClick={addToPlaylist}><AddCircleIcon className={classes.addIcon}/></div>}
                <MusicNoteIcon className={classes.icon}/>
            </div>
            <div className={classes.playlistName}>{props.data["playlistName"]}</div>
            
        </div>
    )
}