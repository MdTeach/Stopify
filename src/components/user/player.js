import React from "react";
import "./player.css";

import {
  getAudioUrl,
  getPicture,
  getAllFiles
} from "../../utils/firebase_storage";

export default () => {
  const artist_name = "Ed Sheeran";

  getPicture(artist_name).then(imgurl => {
    var file = document.getElementById("pic");
    file.src = imgurl;
    //console.log(imgurl);
  });

  const name = "01. Beatiful People.mp3";

  getAudioUrl(name).then(url => {
    var file = document.getElementById("mplayer");
    file.src = url;
    //console.log(url);
  });

  return (
    <div className="total">
      <div className="artist">
        <div className="artist_pic">
          <img id="pic" alt="Artist" />
        </div>
        <div className="artist_des">
          <p className="song_name">Beautiful People</p>
          <p className="artist_name">Ed Sheeran</p>
        </div>
      </div>
      <div className="player">
        <audio id="mplayer" controls="controls"></audio>
      </div>
      <div className="volume">dsfsdfsd</div>
    </div>
  );
};
