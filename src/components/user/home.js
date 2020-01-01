import React, { useContext } from "react";

import { handleLogout } from "../../utils/firebase_login";
import { AuthContext } from "../../auth/Auth";

import Music from "./player";

import {
  getTestAudio,
  playPauseAudio,
  getAudioUrl
} from "../../utils/firebase_storage";

import logo from "../landing_page/images/logo2.png";
import "./home.css";

export default () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <nav className="top">
        <div className="logo_content">
          <img src={logo} alt="logo" className="logoimg"></img>
        </div>

        <div className="profile_header">
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle btn-sm"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ></button>
            <div
              className="dropdown-menu pull-left"
              aria-labelledby="dropdownMenuButton"
            >
              <h5 className="dropdown-header" href="./">
                <img
                  className="profilepic"
                  src={currentUser.photoURL}
                  alt="Pic"
                />
                <b> | {currentUser.displayName}</b>
                <br />
                {currentUser.email}
              </h5>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item " href="#">
                Settings
              </a>
              <a className="dropdown-item " onClick={handleLogout}>
                Log Out
              </a>
            </div>
          </div>
          <div className="welcome">
            Welcome, <b>{currentUser.displayName}</b>
          </div>
        </div>
      </nav>

      <br />
      <button onClick={getTestAudio}>Fetch audio</button>
      <br />
      <button onClick={playPauseAudio}>Play/Pause</button>
      <Music />
    </div>
  );
};
