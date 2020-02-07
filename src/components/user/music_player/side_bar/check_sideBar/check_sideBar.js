import React,{useState,useContext} from 'react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import {Link} from 'react-router-dom'
import {Typography} from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import './sideBar.css'
import {FireStore as db} from '../../../../../utils/firebase.js'
import {AuthContext} from '../../../../../auth/Auth.js'
import Playlist from './playlist.js'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles=makeStyles({
    Button:{
        color:"white",
        textTransform:'none',
        outline:'0 !important',
        fontSize:"13px",
        marginTop:"5px"
        
    },
    playlistButton:{
        color:"white",
        textTransform:'none',
        outline:'0 !important',
        fontSize:"13px",
        marginTop:"10px",
        marginLeft:"18px"
    }, 
    dialogBox:{
        backgroundColor:"gray",
        
    },
    cancelButton:{
        borderRadius:30,
        borderColor:"white",
        color:"white",
        outline:"none !important"
    },
    createButton:{
        color:"white",
        borderRadius:30,
        backgroundColor:"#1ed760",
        outline:"none !important",
        '&:hover':{
            backgroundColor:"#1ed760",
        }
    },
    

})

const blackBox=()=>(
    <svg viewBox="0 0 20 30" height="30px" width="20px">
            <rect width="4px" height="50px" fill="Black" />
          </svg>
)
const greenBox=()=>(
    <svg viewBox="0 0 20 30" height="30px" width="20px">
            <rect width="4px" height="50px" fill="#1ed760" />
          </svg>
)



export default ()=>{
    const {currentUser}=useContext(AuthContext);
    const classes=useStyles();
    const [allowHome,setAllowHome]=useState(true);
    const [allowSearch,setAllowSearch]=useState(false);
    const [allowLibrary,setAllowLibrary]=useState(false);
    const [open,setOpen]=useState(false);
   
    const [Name,setName]=useState("");
    

    const handleTextChange=(e)=>{
       
        setName(e.target.value)
    }

    const handleClickOpen=()=>{
        setOpen(true);
    }

    const handleClose=()=>{
        setOpen(false);
    }

    
    const createPlaylist=()=>{
       
       setOpen(false);
       if(Name.length>0){
        db.collection("userPlaylist").add({
            playlistName:Name,
            uid:currentUser.uid,
            keyID:Date.now()
        })
        .then((docRef)=>{
            console.log("document written with ID:",docRef.id);
            setName("")
        })
        .catch((error)=>{
            console.error("Error adding the document",error);
        })
    }

    
    }

    const Home=()=>{
        setAllowHome(true);
        setAllowSearch(false)
        setAllowLibrary(false);
    }
    const Search=()=>{
        setAllowHome(false);
        setAllowSearch(true)
        setAllowLibrary(false)
    }
    
    const Library=()=>{
        setAllowLibrary(true)
        setAllowSearch(false)
        setAllowHome(false)
    }
    
    return(
      <div>
        { !allowHome && blackBox() }
        {allowHome && greenBox()}
        <Link to='/' style={{textDecoration:'none'}}>
        <Button className={classes.Button} startIcon={<HomeOutlinedIcon style={{fontSize:30}}/>} onClick={Home} >
            Home
        </Button>
        </Link>
        <br/>
        
        { !allowSearch && blackBox() }
        {allowSearch && greenBox()}
        <Link to='/search' style={{textDecoration:'none'}}>
        <Button className={classes.Button} startIcon={<SearchOutlinedIcon style={{fontSize:30}}/>} onClick={Search} >
            Search
        </Button>
        </Link>
        <br/>
        
        { !allowLibrary && blackBox() }
        {allowLibrary && greenBox()}
        <Link to='/library/playlist' style={{textDecoration:'none'}}>
        <Button className={classes.Button} startIcon={<ListOutlinedIcon style={{fontSize:30}}/>} onClick={Library} >
            Library
        </Button>
        </Link>
        <br/>
        <br/>
        <Typography>Playlist</Typography>
        <Button className={classes.playlistButton} startIcon={<AddCircleOutlineOutlinedIcon style={{fontSize:30}}/>} onClick={handleClickOpen}>
            Create Playlist
        </Button>
        <Dialog open={open} onClose={handleClose}  fullWidth>
            <div className={classes.dialogBox}>
            <DialogTitle>Create New Playlist</DialogTitle>
            <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Playlist Name"
            type="text"
            onChange={handleTextChange}
            fullWidth
          />
            </DialogContent>
            <DialogActions>
            <Button variant="outlined" className={classes.cancelButton} onClick={handleClose}>Cancel</Button>
            <Link to='/library/playlist' style={{textDecoration:"none"}}>
            <Button variant="contained" onClick={createPlaylist} className={classes.createButton}>Create</Button>
            </Link>
            </DialogActions>
            </div>
        </Dialog>
        
        <Playlist/>
        </div>
        
         
    )
}
