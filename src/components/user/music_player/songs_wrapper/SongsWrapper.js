import React, { useEffect, useState, useContext } from "react";
import { Route } from "react-router";

//providers
import { AuthContext } from "../../../../auth/Auth.js";
import { CardContext } from "../audio_utils/card_utils";

//css
import "./SongWrapper.css";

//functions
import {
  getAllSongsInfo,
  getAllRecentSongsInfo,
  subscriptionToRecentSongChanges
} from "../audio_utils/audio_utils";

//components
import SongCardDetails from "./songCardDetails";
import PlaylistCardDetails from "./library/playlist/playlistCardDetails";
import Library from "./library/library";
import Search from "../search/Search";

//import SongCard from '../song_card/SongCard'
import SideBar from "../side_bar/check_sideBar/check_sideBar.js";
import MusicPlayer from "../player/MusicPlayer";
import HorizontalMusicContainer from "../horizontal_music_container/HorizontalMusicContainer";
import CircularLoading from "../../../extra/CircularLoading/CircularLoading";

export default () => {
  const [isfetchingSongs, setFetchingSongs] = useState(true);

  const [allRecentSongs, setAllRecentSongs] = useState([]);
  const [allSongs, setAllSongs] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const songeContext = useContext(CardContext);

  document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
  });

  const fetchSongs = async () => {
    //getting the songs as array
    //const songs = await getAllSongsInfo();
    const [songs, rsongs] = await Promise.all([
      getAllSongsInfo(),
      getAllRecentSongsInfo(currentUser)
    ]);

    setFetchingSongs(false);

    //set our songs data
    setAllSongs(songs);
    setAllRecentSongs(rsongs);

    //initall set the current playing song to the 0 index
    songeContext.setAudio(new Audio(songs[0].audioUrl));
  };

  //shows the music in card
  const MusicLists = () => {
    return (
      <React.Fragment>
        {//Loading data
        isfetchingSongs === true ? (
          <CircularLoading style={{ paddingTop: 10 }} />
        ) : allSongs.length === 0 ? (
          <h4>No data</h4>
        ) : (
          <div>
            {allRecentSongs.length === 0 ? (
              ""
            ) : (
              <HorizontalMusicContainer
                title="Recent Songs"
                data={allRecentSongs}
              />
            )}

            <HorizontalMusicContainer data={allSongs} title="All Songs" />
          </div>
        )}
      </React.Fragment>
    );
  };

  useEffect(() => {
    fetchSongs();

    //add the listener when new song is added
    subscriptionToRecentSongChanges(currentUser, async () => {
      const rsongs = await getAllRecentSongsInfo(currentUser);
      try {
        rsongs.sort((b, a) => a.timestamp.seconds - b.timestamp.seconds);
      } catch (error) {
        console.log(error);
      }
      setAllRecentSongs(rsongs);
    });
  }, []);

  return (
    <div className="song-wrapper">
      <div className="sidebar-and-songs">
        <div className="side-bar">
          <SideBar />
        </div>
        <div className="music_lists">
          <Route exact path="/" component={MusicLists} />
          <Route path="/album" component={SongCardDetails} />
          <Route path="/library" component={Library} />

          <Route exact path="/search">
            <Search allSongs={allSongs} />
          </Route>

          <Route path="/userPlaylist" component={PlaylistCardDetails} />
        </div>
      </div>
      <div className="music-controller">
        <MusicPlayer
          currentPlaying={songeContext.currentPlaying}
          audioInstance={songeContext.audio}
        />
      </div>
    </div>
  );
};
