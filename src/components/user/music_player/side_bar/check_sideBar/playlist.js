import React,{useState,useEffect,useContext} from 'react'

import {FireStore as db} from '../../../../../utils/firebase.js'
import {AuthContext} from '../../../../../auth/Auth.js'
import PlaylistCard from './playlistCard'

export default ()=>{
    const {currentUser}=useContext(AuthContext)
    const [allPlaylist,setAllPlaylist]=useState([]);

    const getPlaylistInfo=async()=>{
        db.collection("userPlaylist").where("uid","==",currentUser.uid).get()
        .then((querySnapshot)=>{
            const playlist=querySnapshot.docs.map((el)=>el.data())
            setAllPlaylist(playlist)
            //console.log("sidebar loaded once")
           
        })
        .catch((error)=>{
            console.log("error",error)
        })  
    }



    useEffect(()=>{
        getPlaylistInfo();
        //set the listener as user add or deletes items to the playlist
        db.collection("userPlaylist")
        .where("uid", "==", currentUser.uid)
        .onSnapshot(function(_) {
            getPlaylistInfo()
        }, function(error) {
            console.log(error,"Error")
        });
    },[])

    return(
       <div>
            {
                allPlaylist.map((sample)=>
                <PlaylistCard key={sample["keyID"]} data={sample}/>)
            }
       </div>
    )
}