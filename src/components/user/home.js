import React, { useContext} from "react";

import { AuthContext } from "../../auth/Auth";
import "./home.css";

import UserNav from "./header/user_header";
import SongsWrapper from "./music_player/songs_wrapper/SongsWrapper";

//provider
import {SongDetails} from './music_player/audio_utils/card_utils'
export default () => {
  const { currentUser } = useContext(AuthContext);
  
  return (
    <div className="body">
      <SongDetails>
        <UserNav currentUser={currentUser} />
        <SongsWrapper currentUser={currentUser} />
      </SongDetails>
    </div>
  );
};
