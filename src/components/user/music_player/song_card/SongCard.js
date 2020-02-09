import React from "react";
import "./SongCard.css";
import { Link } from "react-router-dom";

import PlayPauseButton from "./button/Button";

var data = [];

export const cardInfo = () => {
  return data;
};

export default props => {
  const cardDetails = () => {
    data = [];
    data.push(props.data);
  };

  const updateCurrentMusic = () => {
    props.changeMusic(props.data);
  };

  return (
    <div className="song-card">
      <Link to={"/album/" + props.data.name} style={{ textDecoration: "none" }}>
        <div onClick={cardDetails}>
          <img
            className="song-image"
            src={props.data.imageUrl}
            alt={props.data.imageUrl}
          />
          <div className="song-name">
            {props.data.name.length >= 20
              ? props.data.name.substr(0, 20) + "..."
              : props.data.name}
          </div>
          <div className="song-author">{props.data.artist}</div>
        </div>
      </Link>
      <PlayPauseButton
        updateCurrentMusic={updateCurrentMusic}
        isPlaying={props.data === props.currentPlaying}
      />
    </div>
  );
};
