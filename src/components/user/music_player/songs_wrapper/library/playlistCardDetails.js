import React,{useState,useEffect,useContext} from 'react';
import {cardInfo} from './playlist/playlistCard'
import {FireStore as db} from '../../../../../utils/firebase'
import {AuthContext} from '../../../../../auth/Auth'

export default ()=>{
    const [card, setCard] = useState([]);
    const  [songs,setSongs]=useState([]);

    const {currentUser}=useContext(AuthContext);


    const fetchSong=async()=>{
        const getCard=cardInfo();
        setCard(getCard[0]);
        const snaps=await db.collection("playlistSong").where("playlistName","==",getCard[0].playlistName).where("uid","==",currentUser.uid).get();
        const array=snaps.docs.map((el)=>el.data());
        setSongs(array);
    }
   
    useEffect(()=>{
        fetchSong();
    },[])
    return(
        <div style={{color:"white"}}>
        {songs.map((el)=>
        <li key={el["audioUrl"]}>{el["name"]}</li>)}
        </div>
    )
}