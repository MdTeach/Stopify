import React, { useEffect, useState } from "react";

//css
import "./SongWrapper.css";

//functions
import { getAllSongsInfo } from "../audio_utils/audio_utils";

//components
//import SongCard from '../song_card/SongCard'
import SideBar from "../side_bar/side_bar";
import MusicPlayer from "../player/MusicPlayer";
import HorizontalMusicContainer from "../horizontal_music_container/HorizontalMusicContainer";
import CircularLoading from "../../../extra/CircularLoading/CircularLoading";
import UserInfo from "../../user_info/user_info";

export default () => {
  const [isfetchingSongs, setFetchingSongs] = useState(true);
  const [allSongs, setAllSongs] = useState([]);
  const [currentPlaying, setCurrentPlaying] = useState({});

  //get all the song infos
  const fetchSongs = async () => {
    //getting the songs as array
    const songs = await getAllSongsInfo();

    //remove the cirucalar indicator
    setFetchingSongs(false);

    //set our songs data
    setAllSongs(songs);
  };

  //change the playing the song
  const changeMusic = newMusic => {
    if (newMusic["audioUrl"] != currentPlaying["audioUrl"]) {
      //change the music
      setCurrentPlaying(newMusic);
    }
  };

  useEffect(() => {
    console.log("Calling..");
    fetchSongs();
    //loadSongs()
  }, []);

  return (
    <div className="song-wrapper">
      <div className="sidebar-and-songs">
        <div className="side-bar">
          <SideBar />
        </div>
        <div className="music_lists">
          {//Loading data
          isfetchingSongs === true ? (
            <CircularLoading />
          ) : allSongs.length === 0 ? (
            <h4>No data</h4>
          ) : (
            <HorizontalMusicContainer
              data={allSongs}
              changeMusic={changeMusic}
              title="All Songs"
            />
          )}
        </div>
      </div>
      <div className="settings">
        <UserInfo />
      </div>
      <div className="music-controller">
        <MusicPlayer currentPlaying={currentPlaying} />
      </div>
    </div>
  );
};
