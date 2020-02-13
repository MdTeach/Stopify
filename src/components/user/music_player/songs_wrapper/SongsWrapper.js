import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import {SongDetails} from '../audio_utils/card_utils'
//css
import "./SongWrapper.css";
import SongCardDetails from './songCardDetails'
import PlaylistCardDetails from './library/playlist/playlistCardDetails'
import Library from './library/library'
//functions
import { getAllSongsInfo } from "../audio_utils/audio_utils";

//components
//import SongCard from '../song_card/SongCard'
import SideBar from "../side_bar/check_sideBar/check_sideBar.js";
import MusicPlayer from "../player/MusicPlayer";
import HorizontalMusicContainer from "../horizontal_music_container/HorizontalMusicContainer";
import CircularLoading from "../../../extra/CircularLoading/CircularLoading";


export default () => {
  const [isfetchingSongs, setFetchingSongs] = useState(true);
  const [allSongs, setAllSongs] = useState([]);
  const [currentPlaying, setCurrentPlaying] = useState({});

  const [audio, setAudio] = useState(null)

  //get all the song infos
  const fetchSongs = async () => {
    //getting the songs as array
    const songs = await getAllSongsInfo();

    //remove the cirucalar indicator
    setFetchingSongs(false);

    //set our songs data
    setAllSongs(songs);

    //set the default audio to the first song
    setAudio(new Audio(songs[0].audioUrl))

  };

  //change the playing the song
  const changeMusic = newMusic => {
    if (newMusic["audioUrl"] == currentPlaying["audioUrl"]) {
      audio.paused ? audio.play() : audio.pause()
      //setCurrentPlaying({});
    } else {
      //change the music
      setCurrentPlaying(newMusic);
      //setAudio(new Audio(newMusic.audioUrl))
      audio.src = newMusic.audioUrl;
      audio.play();
    }
  };

  //shows the music in card 
  const MusicLists = () => {
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
            audioInstance={!!audio ? audio.paused : true}
          />
        )}
      </React.Fragment>
    );
  };

  useEffect(() => {
    fetchSongs();
    //loadSongs()
  }, []);

  

  return (
    <div className="song-wrapper">
      <SongDetails>
      <div className="sidebar-and-songs">
        <div className="side-bar">
          <SideBar />
        </div>
        <div className="music_lists">
          <Route exact path="/" component={MusicLists} />
          <Route path="/album" component={SongCardDetails}/>
          <Route  path='/library' component={Library}/>
          <Route path='/userPlaylist' component={PlaylistCardDetails}/>
        </div>
      </div>
      <div className="music-controller">
        <MusicPlayer currentPlaying={currentPlaying} audioInstance={audio}/>
      </div>
      </SongDetails>
    </div>
  );
};
