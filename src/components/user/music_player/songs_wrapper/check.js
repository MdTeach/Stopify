import React,{useState,useEffect} from 'react'
import {cardInfo} from '../song_card/SongCard'
import {makeStyles} from '@material-ui/core/styles'
import {Typography,Button} from '@material-ui/core'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MusicNoteOutlinedIcon from '@material-ui/icons/MusicNoteOutlined';

const useStyles=makeStyles({
    upperBox:{
        display:'flex',
        flexDirection:"row"
    },
    cardImage:{
        height:"80px",
        width:"80px",
        marginLeft:".75em",
        marginTop:'.5em',
        borderColor:"gray",
        border:"2px"
    },
    u2Box:{
        marginLeft:'.5em',
        display:'flex',
        flexDirection:"column"
    },
    title:{
        fontSize:16,
        fontWeight:"bold"
    },
    artist:{
        color:"gray",
        fontSize:8
    },
    description:{
        color:"gray",
        fontSize:8,
        marginTop:".2em"
    },
    u2BoxLower:{
        display:"flex",
        flexDirection:"row"
    },
    playButton:{
        marginTop:17,
        backgroundColor:"#1ed760",
        borderRadius:13,
        outline:'none !important',
        color:"white",
        height:"20px",
        '&:hover':{
            backgroundColor:"#1ed760"
        }
    },
    playButtonText:{
        marginTop:-2,
        fontSize:8,
    },
    heartIcon:{
        fontSize:15,
        marginTop:20,
        marginLeft:13
    },
    menuIcon:{
        marginTop:17,
        marginLeft:13
    },
    lowerBox:{
        display:'flex',
        flexDirection:"row",
        marginTop:10
    },
    lowerBoxName:{
        color:"#1ed760",
        display:'flex',
        flexDirection:"row"
    }
})



export default ()=>{
    const classes=useStyles();
    const [card,setCard]=useState([]);

    const fetchCard=()=>{
        const getcard=cardInfo();
        console.log(getcard[0].imageUrl)
        setCard(getcard[0])
    
    }
    const check=()=>{
        console.log(card.album)
    }
    useEffect(()=>{
        fetchCard();
    },[])
    return(
        <div>
       <div className={classes.upperBox} style={{color:"white"}}>
            <div>
                <img src={card.imageUrl} className={classes.cardImage}/>
            </div>
            <div className={classes.u2Box}>
                <Typography className={classes.title}>{card.name}</Typography>
                <Typography className={classes.artist}>{"By "}<b style={{color:"white"}}>{card.artist}</b></Typography>
                <Typography className={classes.description}>2019 . 1 SONG</Typography>
                <div className={classes.u2BoxLower}>
                    <Button className={classes.playButton}>
                        <Typography className={classes.playButtonText}>
                        Play
                        </Typography>
                    </Button>
                    <FavoriteBorderOutlinedIcon className={classes.heartIcon}/>
                    <MoreHorizIcon className={classes.menuIcon}/>
                    
                </div>
            </div>
       </div>
       <div className={classes.lowerBox}>
           <div className={classes.lowerBoxName}>
        <MusicNoteOutlinedIcon/> <Typography>{card.name}</Typography>
        </div>
       </div>
       </div>
    )
}