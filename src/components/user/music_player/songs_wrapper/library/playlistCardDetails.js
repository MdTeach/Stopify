import React,{useState,useEffect} from 'react';
import {cardInfo} from './playlist/playlistCard'

export default ()=>{
    const [card, setCard] = useState([]);

    const fetchCard=()=>{
        const getCard=cardInfo();
        setCard(getCard[0]);
    }
    useEffect(()=>{
        fetchCard();
    },[])
    return(
        <div style={{color:"white"}}>
        {card.playlistName}
        </div>
    )
}