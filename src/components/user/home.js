import React, { useContext} from "react";

import { AuthContext } from "../../auth/Auth";
import "./home.css";

import UserNav from "./header/user_header";
import SongsWrapper from "./music_player/songs_wrapper/SongsWrapper";

export default () => {
  const { currentUser } = useContext(AuthContext);
  
  return (
    <div className="body">
      <UserNav currentUser={currentUser} />
      <SongsWrapper currentUser={currentUser} />
    </div>
  );
};
