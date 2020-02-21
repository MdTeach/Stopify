import React from "react";
import "./HorizontalMusicContainer.css";

import SongCard from "../song_card/SongCard";

export default props => {
  return (
    <div className="horizontal-container">
      {(props.data.length > 0) ? <div className="title">{props.title}</div> : <div></div>}
      <div className="card-container">
        {props.data.map(data => (
          <SongCard
            key={data["audioUrl"] + data["uid"]}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};
