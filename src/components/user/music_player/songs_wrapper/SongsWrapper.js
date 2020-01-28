import React, { useEffect, useState } from "react";
import { Route } from "react-router";
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
import Settings from "../../user_info/user_info";

export default props => {
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
    if (newMusic["audioUrl"] == currentPlaying["audioUrl"]) {
      //pause the music
      //setCurrentPlaying({});
    } else {
      //change the music
      setCurrentPlaying(newMusic);
    }
  };

  const loadingIcon = () => {
    return (
      <React.Fragment>
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
            currentPlaying={currentPlaying}
          />
        )}
      </React.Fragment>
    );
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
          <Route exact path="/" component={loadingIcon} />
          <Route exact path="/settings">
            <Settings currentUser={props.currentUser} />
          </Route>
          <Route exact path="/search" render={() => <h1>Search</h1>} />
          <Route exact path="/library" render={() => <h1>Library</h1>} />
        </div>
      </div>
      <div className="music-controller">
        <MusicPlayer currentPlaying={currentPlaying} />
      </div>
    </div>
  );
};
