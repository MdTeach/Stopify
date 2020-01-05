import React, { useContext } from "react";

import { handleLogout } from "../../utils/firebase_login";
import { AuthContext } from "../../auth/Auth";

import Music from "./player";
import { getUserSong } from "./player";
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

  getAllFiles() // this function creates grid for all the songs in the storage
    .then(function(res) {
      res.items.forEach(function(itemRef, index) {
        var song_name = itemRef.name.replace(".mp3", ""); //removing .mp3 from file name
        //console.log(song_name);
        var new_div = document.createElement("div"); //making new div for every song in storage
        var album_cover = document.createElement("img"); //getting cover pic of song from storage
        var album = document.createElement("p"); //creating title of each song
        var gradient_div = document.createElement("div");
        var img_add;

        getPicture(song_name) //giving source/address to image element
          .then(imgurl => {
            img_add = imgurl;
            album_cover.src = imgurl;
            //console.log(imgurl);
          })
          .catch(function(error) {
            console.log(error);
          });

        //new_div.id = "song" + index;
        if (window.screen.width > 1250) {
          //styling with window size
          new_div.style.height = "450px";
          album_cover.style.height = "75%";
          new_div.style.fontSize = "24px";
        } else if (window.screen.width >= 720 && window.screen.width <= 1250) {
          new_div.style.height = "350px";
          album_cover.style.height = "70%";
          new_div.style.fontSize = "18px";
        } else {
          new_div.style.height = "310px";
          album_cover.style.height = "70%";
          new_div.style.fontSize = "16px";
        }

        new_div.style.background = "rgba(0, 0, 0, 0.8)"; //styling div
        new_div.style.color = "white";
        new_div.style.border = "2px solid rgba(255, 255, 255, 0.8)";
        new_div.style.overflow = "hidden";
        new_div.style.textAlign = "center";
        new_div.style.position = "relative";

        new_div.style.borderRadius = "10px";
        //new_div.innerHTML = index + ") " + itemRef.name;

        album_cover.style.width = "100%"; //styling image
        album_cover.style.borderBottom = "4px solid rgba(240, 234, 234, 0.9)";
        album_cover.style.cursor = "pointer";
        album_cover.id = itemRef.name;

        gradient_div.style.position = "absolute";
        gradient_div.style.zIndex = "1000";
        gradient_div.style.float = "left";
        gradient_div.style.top = "0";
        gradient_div.style.left = "0";
        gradient_div.style.width = "100%";
        gradient_div.style.height = "75%";
        gradient_div.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        gradient_div.id = "gradient_div";
        gradient_div.style.visibility = "hidden";

        album.innerHTML = "<br />" + (index + 1) + ") " + song_name;
        new_div.appendChild(album_cover);
        new_div.appendChild(album);
        new_div.appendChild(gradient_div);
        document.getElementById("grid-container").appendChild(new_div);

        album_cover.onmouseover = function() {
          gradient_div.style.visibility = "visible";
          var play = document.createElement("button");

          play.style.borderRadius = "50%";
          play.style.padding = "0px 30px 0px 30px";
          play.style.position = "absolute";
          play.zIndex = "2000";
          play.style.left = "40%";
          play.style.top = "42%";
          play.style.color = "white";
          play.innerHTML = "►";
          play.style.fontSize = "28px";
          play.style.textAlign = "center";
          play.style.textTransform = "uppercase";
          play.style.webkitTransform = "scale(0.75, 1.5)";
          play.id = "play_button";
          play.style.backgroundColor = "rgba(0, 0, 0, 0)";
          play.style.border = "2px solid white";

          //play.style.transitionDuration = "0.4s";

          //new_div.appendChild(gradient_div);
          gradient_div.appendChild(play);
        };
        album_cover.onmouseout = function() {
          gradient_div.style.visibility = "hidden";
          var element = document.getElementById("play_button");
          element.parentNode.removeChild(element);
        };

        album_cover.onmousedown = function() {
          getUserSong(album_cover.id);
        };
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
      <br />
      <div className="separator">
        <h2 className="home">HOME</h2>
      </div>
      <br />
      <div id="grid-container"></div>
      <br />
      <br />
      <br />
      <br />
      <Music />
    </div>
  );
};
