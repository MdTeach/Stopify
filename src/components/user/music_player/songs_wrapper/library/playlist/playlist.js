import React,{useState,useEffect,useContext} from 'react'
import {FireStore as db} from '../../../../../../utils/firebase'
import {AuthContext} from '../../../../../../auth/Auth'
import PlaylistCard from './playlistCard.js'
import {makeStyles} from '@material-ui/core'

const useStyles=makeStyles({
    container:{
        display:"flex",
        flexDirection:"column",
        '@media (min-width:423px)':{
            flexDirection:"row"
        }
    }
})

export default ()=>{
    const classes=useStyles();
    const {currentUser}=useContext(AuthContext);
    const [allPlaylist,setAllPlaylist]=useState([]);

    const getPlaylistInfo=async()=>{
        db.collection("userPlaylist").where("uid","==",currentUser.uid).get()
        .then((querySnapshot)=>{
            const playlist=querySnapshot.docs.map((el)=>el.data())
            setAllPlaylist(playlist)
           
        })
        .catch((error)=>{
            console.log("error",error)
        })
    }
    useEffect(()=>{
        getPlaylistInfo();
    },[allPlaylist])

    return(
        <div className={classes.container}>
            {allPlaylist.map((el)=>
            <PlaylistCard key={el["keyID"]} data={el}/>
            )}
        </div>
    )
}