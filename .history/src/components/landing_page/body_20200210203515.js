import React, { Component } from "react";
import { Link } from "react-router-dom";

import image1 from "./images/image1.jpg";
import image3 from "./images/image3.jpg";
import image4 from "./images/image4.jpg";
import image5 from "./images/image5.jpg";
import "./styles/body_style.css";

const Body = () => {
  return (
    <div className="container-fluid" style={{ margin: "auto", padding: "0" }}>
      <div className="banner">
        <div className="banner_item">
          <h1>Music for everyone</h1>
          <br />
          <Link to="/login">
            <button className="button_banner">Get Started</button>
          </Link>
        </div>
      </div>

      <div className="container-fluid">
        <div className="intro-section">
          <div className="intro-section-left">
            <p className="intro-text">
              Stopify gives you instant access to millions of songs from old
              favorites to the latest hits. Just hit play to stream anything you
              like.
            </p>
            <br />

            {/* <h3>Music</h3>
              <h6>
                There are millions of songs on Spotify. Play your favorites, discover new tracks, and build the perfect collection.
              </h6>
              
              <h3>Playlists</h3>
              <h6>
                You’ll find readymade playlists to match your mood, put together by music fans and experts.
              </h6>
              
              <h3>New Releases</h3>
              <h6>
              Hear this week’s latest singles and albums, and check out what’s hot in the Top 50.
              </h6> */}
          </div>
          <div className="intro-section-right">
            <img alt="img" src={image1} className="img-fluid" />
          </div>
        </div>
      </div>

      <div className="card-group">
        <div className="card">
          <img className="card-img-top" src={image5} alt="img" />
          <div className="card-body">
            <h5 className="card-title">Listen everywhere</h5>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src={image4} alt="img" />
          <div className="card-body">
            <h5 className="card-title">Unlimited, ad-free music</h5>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src={image3} alt="img" />
          <div className="card-body">
            <h5 className="card-title">Download music & listen offline</h5>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Body;
