import React,{useState,useContext} from 'react';
import { Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import {Link} from 'react-router-dom'
import {CardContext} from '../../../audio_utils/card_utils'


const useStyles = makeStyles({
    card: {
        height: "17em",
        width: "12em",
        marginLeft: 20,
        backgroundColor: "#242323",
        marginTop: 20,
    },
    songImage: {
        width: "9.5em",
        height: "10em",
        marginLeft: "3px"
    },
    songName: {
        padding: "8px 0px 8px 0px",
        textAlign: "left",
        color: "blanchedalmond",
        fontFamily: "Cambria",
        fontAize: "16px",
        display: "flex",
        flexWrap: "wrap"
    },
    songArtist: {
        color: "blanchedalmond",
        fontFamily: "Cambria",
        fontSize: "14px",
        float: "left"
    },
    playIcon:{
        color:"white",
        backgroundColor:"#1ed760",
        fontSize:"40px",
        borderRadius:"30px",
        padding:8,
        marginLeft:"auto",
        marginTop:"-14px",
        '&:hover':{
            cursor:"pointer",
            fontSize:"43px"
        }
    }
})

export default (props) => {
    const classes = useStyles();
    const CardDetails=useContext(CardContext)
    const [over,setOver]=useState(false)

    const cardDetails=()=>{
        CardDetails.feedSong(props.data)
    }
    return (
        <Card variant="outlined" className={classes.card}
         onMouseOver={()=>{setOver(true)}} onMouseLeave={()=>{setOver(false)}} >
            <CardContent>
            <Link to={"/album/" + props.data.name} style={{ textDecoration: "none" }}>
                <div onClick={cardDetails}>
                <img
                    className={classes.songImage}
                    src={props.data.imageUrl}
                    alt={props.data.imageUrl}
                />
                <div className={classes.songName}>{props.data.name}</div>
                </div>
                </Link>
               <div style={{display:"flex"}}>
                <div className={classes.songArtist}>{props.data.artist}</div>
               
                  {over && <PlayArrowIcon className={classes.playIcon}/>}
               
                </div>
            </CardContent>
        </Card>
    )
}