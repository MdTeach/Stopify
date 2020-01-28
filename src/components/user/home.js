import React, { useContext, useEffect } from "react";

import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "../../auth/Auth";
import "./home.css";

import UserNav from "./header/user_header";
import SongsWrapper from "./music_player/songs_wrapper/SongsWrapper";

export default () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="body">
      <BrowserRouter>
        <UserNav currentUser={currentUser} />
        <SongsWrapper currentUser={currentUser} />
      </BrowserRouter>
    </div>
  );
};
