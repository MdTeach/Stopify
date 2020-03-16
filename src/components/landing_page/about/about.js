import React from "react";
import "./about.css";

function about() {
  return (
    <div className="about">
      <div className="text-container">
        <h1>About Stopify</h1>
        <br />
        <p>
          Stopify is a web based app made in order to clone the popular music
          streaming web based app Spotify. Like Spotify, Stopify gives you
          instant access to millions of songs from old favorites to the latest
          hits. Just hit play to stream anything you like. Create a playlist of
          various genres or your liked songs to listen anywhere anytime.
        </p>
        <p>If you want to upload your own song click the Admin button below</p>
        <a href="https://stopify-admin.netlify.com/">
          <button>Admin</button>
        </a>
      </div>
    </div>
  );
}

export default about;
