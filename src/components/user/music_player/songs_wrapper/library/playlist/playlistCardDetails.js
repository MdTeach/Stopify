import React, { useState, useEffect, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography, Button} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { FireStore as db } from "../../../../../../utils/firebase";
import { AuthContext } from "../../../../../../auth/Auth";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import {CardContext} from '../../.././audio_utils/card_utils'
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import PlaylistSongCard from './playlistSongCard'
import {Link} from 'react-router-dom'

const StyledMenuItem = withStyles(theme => ({
  root: {
    backgroundColor: "#363636",
    color: "gray",
    marginTop: -8,
    marginBottom: -8,
    marginLeft: "auto",

    "&:hover": {
      backgroundColor: "#363636",
      color: "white"
    }
  }
}))(MenuItem);

const useStyles = makeStyles({
  total: {
    paddingTop:"30px",
    width: "100%",
    WebkitTransform: "scale(0.8, 0.8)"
  },
  upperBox: {
    marginTop: "-40px",
    marginLeft: "-15px",
    display: "flex",
    flexDirection: "row",
    marginBottom: "25px"
  },
  imageBox: {
    paddingRight: "20px"
  },
  cardImage: {
    height: "80px",
    width: "80px",
    marginLeft: ".75em",
    marginTop: ".5em",
    borderColor: "gray",
    border: "2px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  },
  u2Box: {
    marginLeft: ".5em",
    marginTop: "1em",
    display: "flex",
    flexDirection: "column"
  },
  artist: {
    color: "gray",
    fontSize: 8
  },
  u2BoxLower: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  playButton: {
    marginTop: 17,
    backgroundColor: "#1ed760",
    borderRadius: 13,
    outline: "none !important",
    color: "white",
    height: "20px",
    "&:hover": {
      backgroundColor: "#1ed760"
    }
  },
  LowerBoxButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  playButtonText: {
    marginTop: -2,
    fontSize: 8
  },
  heartIcon: {
    color: "white",
    fontSize: 15,
    marginTop: 10,
    marginLeft: 5
  },

  menuIcon: {
    marginTop: 17,
    marginLeft: 5,
    "&:hover": {
      cursor: "pointer"
    }
  },

  plName: {
    fontSize: 16,
    fontWeight: "bold"
  },
  lowerBox: {
    display: "flex",
    flexDirection: "column",
    marginTop: "25px",
    marginLeft: "5px"
  },
  horizontal: {
    display: "block",
    backgroundColor: "gray",
    marginLeft: "5px",
    width: "100%"
  },
  menu: {
    marginLeft: 10,
    marginTop: 35,
    padding: -20
  },
  dialogBox: {
    backgroundColor: "gray"
  },

  "@media (min-width:921px)": {
    menu: {
      marginTop: 25
    },
    total: {
      width: "100%",
      WebkitTransform: "scale(1, 1)"
    },
    upperBox: {
      float: "left",
      display: "flex",
      flexDirection: "column",
      marginTop: "-25px",
      padding: "50px 20px 100px 50px",
      marginLeft: "15px",
      marginBottom: "0px"
    },
    cardImage: {
      width: "300px",
      height: "300px",
      marginLeft: ".75em",
      marginTop: ".5em",
      borderColor: "gray",
      border: "2px"
    },
    u2Box: {
      padding: "10px",
      alignItems: "center"
    },
    u2BoxLower: {
      display: "flex",
      flexDirection: "column",
      padding: "10px"
    },
    playButton: {
      width: "125px",
      height: "38px",
      borderRadius: "200px",
      margin: "15px 0px 15px 0px",
      "&:hover": {
        width: "130px",
        height: "40px",
        backgroundColor: "#32c968"
      }
    },
    lowerBox: {
      paddingLeft: "45px",
      marginTop: "50px",
      marginRight: "120px",
      display: "flex",
      flexDirection: "column"
    },
    playButtonText: {
      marginTop: 0,
      fontSize: 12,
      fontFamily: "Helvetica"
    },
    heartIcon: {
      fontSize: 25,
      marginTop: 12,
      marginLeft: 13
    },
    plName: {
      marginLeft: -12,
      fontSize: 24,
      fontWeight: 800,
      fontFamily: "Arial, Helvetica, sans-serif"
    },
    menuIcon: {
      fontSize: 25,
      marginTop: 20,
      marginLeft: 15
    },
    artist: {
      paddingTop: "20px",
      color: "gray",
      fontSize: 14
    },
    horizontal: {
      display: "none"
    }
  }
});

export default () => {
  const classes = useStyles();
  const CardDetails=useContext(CardContext);
  const [songs, setSongs] = useState([]);
  const [DialogOpen, setDialogOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { currentUser } = useContext(AuthContext);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = e => {
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setAnchorEl(null);
  };

  function toDelete() {
    const plName=CardDetails.playlistDetails
    handleDialogClose();
    db.collection("userPlaylist")
      .where("playlistName", "==", plName)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
          console.log("deleted");
        });
      })
      .catch(error => {
        console.log("error", error);
      });

    db.collection("playlistSong")
      .where("playlistName", "==", plName)
      .where("uid", "==", currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  }


  const fetchSong = async () => {
    const getCard = CardDetails.playlistDetails
    const snaps = await db
      .collection("playlistSong")
      .where("playlistName", "==", getCard)
      .where("uid", "==", currentUser.uid)
      .get();
    const array = snaps.docs.map(el => el.data());
    setSongs(array);
  };

  //check if the playlist song is playing and pause accordingly
  const setPlayPauseStatus = ()=>{
    if(CardDetails.audio.paused){
      setIsPlaying(false)
    }else{
      setIsPlaying(false)
      for(let song of songs){
        if(song["audioUrl"] === CardDetails.audio.src){
          setIsPlaying(true)
        }
      }
    }
  }

  const handlePlay = ()=>{
    if(songs.length>0){
      CardDetails.changeMusic(songs[0]);
      setPlayPauseStatus()
    }
  }

  useEffect(() => {
    fetchSong();
    setPlayPauseStatus();
  }, []);
  return (
    <div style={{ color: "white" }}>
      <div className={classes.total}>
        <div className={classes.upperBox} style={{ color: "white" }}>
          <div className={classes.imageBox}>
            <MusicNoteIcon className={classes.cardImage} />
          </div>
          <div className={classes.u2Box}>
            <Typography className={classes.plName}>
              {CardDetails.playlistDetails}
            </Typography>
            <Typography className={classes.artist}>
              {"By "}
              <b style={{ color: "white" }}>{currentUser.displayName}</b>
            </Typography>

            <div className={classes.u2BoxLower}>
              <Button className={classes.playButton} onClick={handlePlay}>
                <Typography className={classes.playButtonText}>
                  {isPlaying ? "Pause" : "Play"}
                </Typography>
              </Button>
              <div className={classes.LowerBoxButtons}>
                <MoreHorizIcon
                  className={classes.menuIcon}
                  onClick={handleClick}
                />
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  className={classes.menu}
                  onClose={handleClose}
                >
                  <StyledMenuItem
                    onClick={() => {
                      setDialogOpen(true);
                    }}
                  >
                    Delete Playlist
                  </StyledMenuItem>
                </Menu>
                <Dialog open={DialogOpen} onClose={handleDialogClose} fullWidth>
                  <DialogTitle>{"Are you sure want to delete it?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Your Playlist will be permanently deleted.You can't
                      recover it later.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                      Disagree
                    </Button>
                    <Link to="/library" style={{textDecoration:"none"}}>
                    <Button color="primary" autoFocus onClick={toDelete}>
                      Agree
                    </Button>
                    </Link>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
        <hr className={classes.horizontal} />
        <div className={classes.lowerBox}>
          {
            songs.map(el=>(
              <PlaylistSongCard 
                key={el["audioUrl"]} 
                playlistName={CardDetails.playlistDetails} 
                data={el}
                changeParentLabel={setPlayPauseStatus}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};
