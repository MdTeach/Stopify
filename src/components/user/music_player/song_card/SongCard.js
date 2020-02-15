import React, { useContext } from "react";
import "./SongCard.css";
import { Link } from "react-router-dom";
import { CardContext } from "../audio_utils/card_utils";
import PlayPauseButton from "./button/Button";

export default props => {
  const CardDetails = useContext(CardContext);
  const cardDetails = () => {
    CardDetails.feedSong(props.data);
  };

  const updateCurrentMusic = () => {
    props.changeMusic(props.data);
  };

  const handleClick = () => {
    updateCurrentMusic();
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
        data={props.data}
        updateCurrentMusic={updateCurrentMusic}
        isPlaying={props.data.name === props.currentPlaying.name}
        handleClick={handleClick}
        isPaused={props.audioInstance}
      />
    </div>
  );
};
