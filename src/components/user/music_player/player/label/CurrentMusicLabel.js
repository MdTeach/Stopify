import React, { useContext } from "react";
import { CardContext } from "../../../music_player/audio_utils/card_utils";

import { Link } from "react-router-dom";

import "./CurrentMusicLabel.css";

export default props => {
  const data = props.data;
  const CardDetails = useContext(CardContext);
  const cardDetails = () => {
    CardDetails.feedSong(props.data);
  }; 

  const isDataAvialbel = Object.keys(data).length === 0 ? false : true;
  return !isDataAvialbel ? (
    //no song is selected
    <div></div>
  ) : (
    <Link to={"/album/" + props.data.name} style={{ textDecoration: "none" }}>
      <div className="current-music-label" onClick={cardDetails}>
        <div className="muic-thumb-nail-div">
          <img
            className="muic-thumb-nail"
            alt={data["imageUrl"]}
            src={data["imageUrl"]}
          />
        </div>

        <div className="labels">
          <div className="song_name" onClick={cardDetails}>
            {data["name"]}
          </div>

          <div className="song_artist" onClick={cardDetails}>
            {data["artist"]}
          </div>
        </div>
      </div>
    </Link>
  );
};
