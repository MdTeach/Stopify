import React, { useState, useContext,useEffect} from "react";
import { Card } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from '@material-ui/icons/Pause';
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import MusicNoteOutlinedIcon from "@material-ui/icons/MusicNoteOutlined";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import { CardContext } from "../../../audio_utils/card_utils";
import { Link } from "react-router-dom";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FireStore as db } from "../../../../../../utils/firebase";

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
  card: {
    width: 780,
    marginLeft: 20,
    height: 65,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "#3D3D3D"
    }
  },
  content: {
    display: "flex",
    paddingBottom: 5
  },
  musicIcon: {
    color: "white",
    fontSize: 20
  },
  holder: {
    display: "flex",
    flexDirection: "column",
    marginTop: -5,
    marginLeft: 15
  },
  songName: {
    fontFamily: "Cambria",
    fontSize: 17,
    color: "white"
  },
  artist: {
    fontSize: 13,
    fontFamily: "halvetica",
    color: "gray"
  },
  linkName: {
    fontSize: 13,
    fontFamily: "halvetica",
    color: "gray",
    marginLeft: 4,
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer"
    }
  },
  menuIcon: {
    color: "white",
    fontSize: 20,
    marginLeft: "auto",
    "&:hover": {
      cursor: "pointer"
    }
  },
  menu: {
    marginTop: 25
  },
  "@media (max-width:921px)": {
    card: {
      width: "100%"
    }
  }
});

export default props => {
  const classes = useStyles();
  const [over, setOver] = useState(false);
  const CardDetails = useContext(CardContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isPlaying, setIsPlaying] = useState(false);

  
  //check if the icon  is playing and pause accordingly
  const setPlayPauseStatus = ()=>{
    if(CardDetails.audio.paused){
      setIsPlaying(false)
    }else{
      setIsPlaying(false)
      if(props.data["audioUrl"] === CardDetails.audio.src){
        setIsPlaying(true)
      }else{
        setIsPlaying(false)
      }
    }
    props.changeParentLabel();
  }

  const handlePlay = ()=>{
    if(props.data){
      CardDetails.changeMusic(props.data);
      setPlayPauseStatus()
    }
  }


  const handleMenuOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = e => {
    setAnchorEl(null);
  };

  const cardDetails = () => {
    CardDetails.feedSong(props.data);
  };

  const toDelete = () => {
    setAnchorEl(null);
    db.collection("playlistSong")
      .where("playlistName", "==", props.playlistName)
      .where("name", "==", props.data.name)
      .get()
      .then(querySnapshot => {
        const song = querySnapshot.docs[0];
        song.ref.delete();
        console.log("song deleted from playlist");
      });
  };

  useEffect(() => {
    setPlayPauseStatus();
  });

  return (
    <Card
      className={classes.card}
      square
      onMouseOver={() => {
        setOver(true);
      }}
      onMouseLeave={() => {
        setOver(false);
      }}
    >
      <CardContent>
        <div className={classes.content} onClick={handlePlay}>
          {
          !over ?
            <MusicNoteOutlinedIcon className={classes.musicIcon} />
            :
            isPlaying ? 
              <PauseIcon className={classes.musicIcon} />
            :
              <PlayArrowIcon className={classes.musicIcon} />
          }
          
          <div className={classes.holder}>
            <div className={classes.songName}>{props.data.name}</div>
            <div style={{ display: "flex" }}>
              <div className={classes.artist}>{props.data.artist + " |"}</div>
              <Link
                to={"/album/" + props.data.name}
                style={{ textDecoration: "none" }}
              >
                <div className={classes.linkName} onClick={cardDetails}>
                  {props.data.name}
                </div>
              </Link>
            </div>
          </div>
          {over && (
            <MoreHorizIcon
              className={classes.menuIcon}
              onClick={handleMenuOpen}
            />
          )}
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleMenuClose}
            className={classes.menu}
          >
            <StyledMenuItem onClick={toDelete}>
              Remove from playlist
            </StyledMenuItem>
          </Menu>
        </div>
      </CardContent>
    </Card>
  );
};
