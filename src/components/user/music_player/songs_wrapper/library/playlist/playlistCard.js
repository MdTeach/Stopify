import React,{useContext,useState} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles,withStyles,Typography} from '@material-ui/core'
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import {AuthContext} from '../../../../../../auth/Auth'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {FireStore as db} from '../../../../../../utils/firebase'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'

var data=[];

export const cardInfo=()=>{
    return data; 
  }

const StyledMenuItem = withStyles(theme => ({
    root: {
        backgroundColor:"#363636",
        color:"gray",
        margin:-8,
        paddingRight:60,
        paddingLeft:20,
  
      '&:hover': {
        backgroundColor: "#363636",
        color:"white"
      },
    },
  }))(MenuItem);

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
    },
    optionIcon:{
        color:"white",
        marginLeft:"auto",
        '&:hover':{ 
            cursor:"pointer"  
}
    },
    menu:{
        marginTop:35
      }
})

export default (props)=>{
    const {currentUser}=useContext(AuthContext);
    const classes=useStyles();
    const [anchorEl,setAnchorEl]=React.useState(null);
    const open=Boolean(anchorEl);
    const [openDialog,setOpenDialog]=useState(false)
    const handleClick=e=>{
        setAnchorEl(e.currentTarget);
    }
    const handleClose=e=>{
        setAnchorEl(null)
    }
    const handleDialogClose=e=>{
        setOpenDialog(false);
        setAnchorEl(false);
    }
    function toDelete() {
        db.collection("userPlaylist").where("playlistName", "==", props.data["playlistName"]).get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                    console.log("deleted")
                    setOpenDialog(false);
                })
            })
            .catch(error => {
                console.log("error", error)
            })

    }
    const cardDetails=()=>{
        data=[];
        data.push(props.data);
      }
    return(
        <Card variant="outlined" className={classes.card}>
           
            <CardContent>
            <Link to={"/userPlaylist/"+props.data.playlistName} style={{textDecoration:'none'}}>
                <div onClick={cardDetails}>
                <div className={classes.iconHolder}>
                   <MusicNoteIcon className={classes.icon}/>
                </div>
                </div>
                </Link>
                <div className={classes.description}>
                <Typography className={classes.playlistName}>{props.data["playlistName"]}</Typography>
                
               <div style={{display:"flex"}}>
                <Typography className={classes.user}>By{" "+currentUser.displayName}</Typography>
                
                <MoreVertIcon className={classes.optionIcon} onClick={handleClick}/>
                </div>
                <Menu anchorEl={anchorEl} keepMounted open={open} className={classes.menu} onClose={handleClose}  >
         
                    <StyledMenuItem onClick={()=>{setOpenDialog(true)}}>Delete</StyledMenuItem>
                    
          </Menu>
          <Dialog open={openDialog} onClose={handleDialogClose}>
                        <DialogTitle>{"Are you sure want to delete it?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText >
                                Your Playlist will be permanently deleted.You can't recover it later.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClose} color="primary">
                                Disagree
                             </Button>
                            <Button onClick={toDelete} color="primary" autoFocus>
                                Agree
                             </Button>
                        </DialogActions>

                    </Dialog>
                </div>
            </CardContent>
        </Card>
        )
}