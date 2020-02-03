import React,{useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import {FireStore as db} from '../../../../../utils/firebase.js'

const useStyles=makeStyles({
    card:{
        height:30,
        marginTop:5,
        width:175,
        marginLeft:45,
        backgroundColor:"black",
        '&:hover':{
            cursor:"pointer"
        }
    },
    name:{
        marginTop:"-15px",
        color:"white",
        fontSize:13
    },
    deleteIcon:{
        marginLeft:"auto",
        color:"black",
        marginTop:"-13px",
        fontSize:20,
        color:"white",
        '&:hover':{
            color:"red"
        }
    },
    details:{
        display:'flex',
        flexDirection:"row"
    }
})

export default (props)=>{
    const classes=useStyles();
    const [open,setOpen]=useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose=()=>{
        setOpen(false)
    }

    function toDelete() {
        db.collection("userPlaylist").where("playlistName", "==", props.data["playlistName"]).get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                    console.log("deleted")
                    setOpen(false);
                })
            })
            .catch(error => {
                console.log("error", error)
            })

    }

    return(
        <Card variant="outlined" className={classes.card}>
            <CardContent>
                <div className={classes.details}>
                <Typography className={classes.name} >{props.data["playlistName"]}</Typography>
                <DeleteIcon className={classes.deleteIcon} onClick={handleClickOpen}/>
                <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{"Are you sure want to delete it?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText >
                                Your Playlist will be permanently deleted.You can't recover it later.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
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