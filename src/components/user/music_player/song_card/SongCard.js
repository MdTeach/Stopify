import React from "react";
import "./SongCard.css";

var notPlaying = true;
export default props => {
  const updateCurrentMusic = () => {
    props.changeMusic(props.data);
    const play = document.getElementById(props.data.name + "-play");
    const pause = document.getElementById(props.data.name + "-pause");
    const pause2 = document.getElementById(props.data.name + "-pause2");
    if (!notPlaying) {
      play.style.display = "block";
      pause.style.display = "none";
      pause2.style.display = "none";
      notPlaying = true;
    } else {
      play.style.display = "none";
      pause.style.display = "block";
      pause2.style.display = "block";
      notPlaying = false;
    }
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
      <button className="song-button" onClick={updateCurrentMusic}>
        <svg height="16" role="img" width="16" viewBox="0 0 24 28">
          <polygon
            id={props.data.name + "-play"}
            points="21.57 12 5.98 3 5.98 21 21.57 12"
            fill="white"
          />
          <rect
            id={props.data.name + "-pause"}
            x="5"
            y="3"
            width="4"
            height="18"
            fill="white"
            display="none"
          ></rect>
          <rect
            id={props.data.name + "-pause2"}
            x="15"
            y="3"
            width="4"
            height="18"
            fill="white"
            display="none"
          ></rect>
        </svg>
      </button>
    </div>
  );
};
