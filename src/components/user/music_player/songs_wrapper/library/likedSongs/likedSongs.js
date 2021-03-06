import React, { useState, useContext, useEffect } from "react";
import { FireStore as db } from "../../../../../../utils/firebase";
import { AuthContext } from "../../../../../../auth/Auth";
import { makeStyles } from "@material-ui/core/styles";
import LikedSongCard from "./likedSongCard";
import SongCard from "../../../song_card/SongCard"


const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});

export default () => {
  const classes = useStyles();
  const [likedSongs, setLikedSongs] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const getLikedSongs = async () => {
    db.collection("LikedSongs")
      .where("uid", "==", currentUser.uid)
      .get()
      .then(querySnapshot => {
        const likedSong = querySnapshot.docs.map(el => el.data());
        setLikedSongs(likedSong);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getLikedSongs();
    //set the listener as user add or deletes items to the playlist
    db.collection("LikedSongs")
      .where("uid", "==", currentUser.uid)
      .onSnapshot(
        function(_) {
          getLikedSongs();
        },
        function(error) {
          console.log(error, "Error");
        }
      );
  }, []);

  return (
    <div className={classes.container}>
      {likedSongs.map(el => (
        <SongCard key={el["audioUrl"]} data={el} />
      ))}
    </div>
  );
};
