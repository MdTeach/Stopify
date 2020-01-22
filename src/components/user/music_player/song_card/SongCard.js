import React from "react";
import "./SongCard.css";

import PlayPauseButton from './button/Button';


export default props => {
  
  const updateCurrentMusic = () => {
    props.changeMusic(props.data);
  };

  return (
    <div className="song-card">
      <img
        className="song-image"
        src={props.data.imageUrl}
        alt={props.data.imageUrl}
      />
      <div className="song-name">{props.data.name}</div>
      <div className="song-author">{props.data.artist}</div>
      <PlayPauseButton 
        updateCurrentMusic={updateCurrentMusic}
        isPlaying = {props.data === props.currentPlaying }
      />
    </div>
  );
};
