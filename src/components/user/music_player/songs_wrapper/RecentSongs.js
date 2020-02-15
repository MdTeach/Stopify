import React, { useEffect } from "react";

//import { FireStore as db } from "../../../../utils/firebase";
//import { FireStore as db } from "../../../../utils/firebase.js";
import HorizontalMusicContainer from "../horizontal_music_container/HorizontalMusicContainer";

export default props => {
  return (
    <HorizontalMusicContainer
      data={props.data}
      changeMusic={props.changeMusic}
      title="Recent Songs"
      currentPlaying={props.currentPlaying}
      audioInstance={props.audioInstance}
    />
  );
};
