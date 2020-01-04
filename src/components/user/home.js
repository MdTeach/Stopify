import React, { useContext } from "react";

import { handleLogout } from "../../utils/firebase_login";
import { AuthContext } from "../../auth/Auth";

import Music from "./player";

import {
  getTestAudio,
  playPauseAudio,
  getAudioUrl,
  getAllFiles,
  getPicture
} from "../../utils/firebase_storage";

import logo from "../landing_page/images/logo2.png";
import "./home.css";

export default () => {
  const { currentUser } = useContext(AuthContext);

  getAllFiles()
    .then(function(res) {
      res.items.forEach(function(itemRef, index) {
        var song_name = itemRef.name.replace(".mp3", "");
        console.log(song_name);
        var new_div = document.createElement("div");
        var album_cover = document.createElement("img");
        var album = document.createElement("p");

        getPicture(song_name)
          .then(imgurl => {
            album_cover.src = imgurl;
            //console.log(imgurl);
          })
          .catch(function(error) {
            console.log(error);
          });

        //new_div.id = "song" + index;
        new_div.style.height = "350px";
        new_div.style.background = "rgba(0, 0, 0, 0.8)";
        new_div.style.color = "white";
        new_div.style.border = "2px solid rgba(255, 255, 255, 0.8)";
        new_div.style.overflow = "hidden";
        new_div.style.textAlign = "center";
        new_div.style.fontSize = "18px";
        new_div.style.borderRadius = "10px";
        //new_div.innerHTML = index + ") " + itemRef.name;

        album_cover.style.width = "100%";
        album_cover.style.height = "70%";
        album_cover.style.borderBottom = "4px solid rgba(240, 234, 234, 0.9)";

        album.innerHTML = "<br />" + index + ") " + song_name;
        new_div.appendChild(album_cover);
        new_div.appendChild(album);
        document.getElementById("grid-container").appendChild(new_div);
      });
    })
    .catch(function(error) {
      console.log("Some error");
    });

  return (
    <div className="body">
      <nav className="top ">
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
      <div className="separator">
        <h2 className="home">HOME</h2>
      </div>
      <br />
      <div id="grid-container"></div>
      <ul id="Lists"></ul>
      <Music />
    </div>
  );
};
