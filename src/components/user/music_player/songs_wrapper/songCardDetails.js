import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Card } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import MusicNoteOutlinedIcon from "@material-ui/icons/MusicNoteOutlined";
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Checkbox from '@material-ui/core/Checkbox';
import {FireStore as db} from '../../../../utils/firebase'
import {AuthContext} from '../../../../auth/Auth'
import {CardContext} from '../audio_utils/card_utils'

const useStyles = makeStyles({
  total: {
    width: "100%",
    WebkitTransform: "scale(0.8, 0.8)"
  },
  upperBox: {
    marginTop: "-40px",
    marginLeft: "-10px",
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
    display: "flex",
    flexDirection: "column"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  artist: {
    color: "gray",
    fontSize: 8
  },
  description: {
    color: "gray",
    fontSize: 8,
    marginTop: ".2em"
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
    justifyContent: "center",
  },
  playButtonText: {
    marginTop: -2,
    fontSize: 8
  },
  heartIcon: {
    color:"white",
    fontSize: 15,
    marginTop: 10,
    marginLeft: 5
  },

  menuIcon: {
    marginTop: 17,
    marginLeft: 5
  },
  lowerBox: {
    display: "flex",
    flexDirection: "column",
    marginTop: "25px",
    marginLeft: "5px"
  },
  lowerBoxName: {
    color: "#1ed760",
    display: "flex",
    flexDirection: "row"
  },
  lowerBoxArtist: {
    display: "block",
    paddingLeft: "45px",
    fontSize: "12px",
    color: "white"
  },
  copyright: {
    display: "block",
    marginLeft: "30px",
    marginTop: "25px",
    color: "gray",
    fontSize: "12px",
    marginBottom: "300px"
  },
  horizontal: {
    display: "block",
    backgroundColor: "gray",
    marginLeft: "5px",
    width: "100%"
  },
  "@media (min-width:921px)": {
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
    lowerBoxArtist: {
      display: "block",
      paddingLeft: "45px",
      fontSize: "12px",
      color: "white"
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

    menuIcon: {
      fontSize: 25,
      marginTop: 20,
      marginLeft: 15
    },
    title: {
      marginLeft: -12,
      fontSize: 24,
      fontWeight: 800,
      fontFamily: "Arial, Helvetica, sans-serif"
    },
    artist: {
      color: "gray",
      fontSize: 14
    },
    copyright: {
      display: "block",
      paddingLeft: "15px",
      fontSize: "12px",
      color: "gray",
      paddingTop: "15px",

      marginBottom: "0px"
    },
    horizontal: {
      display: "none"
    }
  }
});

export default () => {
  const {currentUser}=useContext(AuthContext)
  const CardDetails=useContext(CardContext)
  const classes = useStyles();
  const [card, setCard] = useState([]);
  const [checked,setChecked]=useState(false);
  
  const songLiked=()=>{
    
    if(checked==false){
      setChecked(true);
    db.collection("LikedSongs").add({
      album:card.album,
      artist:card.artist,
      audioUrl:card.audioUrl,
      genre:card.genre,
      imageUrl:card.imageUrl,
      name:card.name,
      uid:currentUser.uid
    })
    .then(docRef=>{
      console.log("Liked song added at",docRef.id)
    })
    .catch((error)=>{
      console.log("Error to add Liked song",error)
    })
  }
  if(checked==true){
    setChecked(false);
    db.collection("LikedSongs").where("uid","==",currentUser.uid).where("audioUrl","==",card.audioUrl).get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                    console.log("Liked song deleted")
                })
            })
            .catch(error => {
                console.log("error", error)
            })
  }

}

  const fetchLikedSong=()=>{
    const getcard = CardDetails.songDetails;
    setCard(getcard[0]);
    db.collection("LikedSongs").where("uid","==",currentUser.uid).where("audioUrl","==",getcard[0].audioUrl).get()
    .then((querySnapshot)=>{
      console.log("fetched liked song")
    querySnapshot.forEach(function (doc) {
      setChecked(true);
  });
    })
    .catch(error=>{
      console.log("error",error)
    })
  }

  useEffect(() => {
    fetchLikedSong();
  }, []);
 
  

  return (
    <div className={classes.total}>
      <div className={classes.upperBox} style={{ color: "white" }}>
        <div className={classes.imageBox}>
          <img src={card.imageUrl} className={classes.cardImage} />
        </div>
        <div className={classes.u2Box}>
          <Typography className={classes.title}>{card.name}</Typography>
          <Typography className={classes.artist}>
            {"By "}
            <b style={{ color: "white" }}>{card.artist}</b>
          </Typography>
          <Typography className={classes.description}>2019 . 1 SONG</Typography>
          <div className={classes.u2BoxLower}>
            <Button className={classes.playButton}>
              <Typography className={classes.playButtonText}>Play</Typography>
            </Button>
            <div className={classes.LowerBoxButtons}>
            <Checkbox icon={<FavoriteBorder className={classes.heartIcon}/>} 
            checkedIcon={<Favorite className={classes.heartIcon} />}
            onClick={songLiked} checked={checked} />
              <MoreHorizIcon className={classes.menuIcon} />
            </div>
          </div>
        </div>
      </div>
      <hr className={classes.horizontal} />
      <div className={classes.lowerBox}>
        <div className={classes.lowerDraggable}>
          <div className={classes.lowerBoxName}>
            <MusicNoteOutlinedIcon />
            <Typography style={{ paddingLeft: "20px" }}>{card.name}</Typography>
          </div>
          <Typography className={classes.lowerBoxArtist}>
            {card.artist}
          </Typography>
        </div>
        <Typography className={classes.copyright}>© {card.artist}</Typography>
      </div>
    </div>
  );
};
