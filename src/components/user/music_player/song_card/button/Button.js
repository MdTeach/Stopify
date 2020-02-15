import React, { useState, useContext, useEffect } from "react";

import PlayIcon from "./Play";
import PauseIcon from "./Pause";
import { FireStore as db } from "../../../../../utils/firebase.js";
import { AuthContext } from "../../../../../auth/Auth";

export default props => {
  const [isPaused, setPause] = useState(props.isPaused);
  //const { recentSongs } = useContext(RecentContext);
  const { currentUser } = useContext(AuthContext);
  const [present, setPresent] = useState(false);
  /*const getAllRecent = async () => {
    try {
      const snaps = await db
        .collection("recentSongs")
        .where("uid", "==", currentUser.uid)
        .get();
      const recsongs = snaps.docs.map(el => el.data());
      setRecent(recsongs);
    } catch (error) {
      return { error: error };
    }
  };
*/
  const checkPresent = async () => {
    try {
      const snaps = await db
        .collection("recentSongs")
        .where("uid", "==", currentUser.uid)
        .where("name", "==", props.data.name)
        .get();
      const songs = snaps.docs.map(el => el.data());
      //console.log(songs);
      const val = songs.length === 0 ? false : true;
      setPresent(val);
    } catch (error) {
      console.log(error);
    }
    //console.log(val);
  };

  useEffect(() => {
    checkPresent();
  }, []);

  const addRecent = () => {
    db.collection("recentSongs")
      .add({
        album: props.data.album,
        artist: props.data.artist,
        audioUrl: props.data.audioUrl,
        genre: props.data.genre,
        imageUrl: props.data.imageUrl,
        name: props.data.name,
        uid: currentUser.uid
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleClick = () => {
    props.handleClick();
    setPause(isPaused ? false : true);
    if (!present) {
      addRecent();
    }
  };

  return (
    <button className="song-button" onClick={handleClick}>
      {!isPaused && props.isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
};
