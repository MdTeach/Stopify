import React,{useContext} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles,Typography} from '@material-ui/core'
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import {AuthContext} from '../../../../../../auth/Auth'

const useStyles=makeStyles({
    card:{
        height:"15em",
        width:"12em",
        marginLeft:20,
        backgroundColor:"#242323",
        marginTop:20
    },
    iconHolder:{
        height:"9em",
        width:"10em",
        backgroundColor:"#363636",
        alignItems:"center"
    },
    icon:{
        marginLeft:"25px",
        marginTop:"25px",
        fontSize:100,
        color:"white"
    },
    playlistName:{
        color:"white",
        fontWeight:"bolder"
    },
    description:{
        marginTop:"10px",
        display:"flex",
        flexDirection:"column"
    },
    user:{
        fontSize:10,
        color:"gray",
        marginTop:8
    }
})

export default (props)=>{
    const {currentUser}=useContext(AuthContext);
    const classes=useStyles();
    return(
        <Card variant="outlined" className={classes.card}>
            <CardContent>
                <div className={classes.iconHolder}>
                   <MusicNoteIcon className={classes.icon}/>
                </div>
                <div className={classes.description}>
                <Typography className={classes.playlistName}>{props.data["playlistName"]}</Typography>
                <Typography className={classes.user}>By{" "+currentUser.displayName}</Typography>
                </div>
            </CardContent>
        </Card>
        )
}