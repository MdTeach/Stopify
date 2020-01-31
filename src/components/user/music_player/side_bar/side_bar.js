import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Home from "./buttons/HomeB";
import Search from "./buttons/Search";
import SongsLib from "./buttons/songsLib";
import "./side_bar.css";

import { handleLogout } from "../../../../utils/firebase_login";
export default () => {
  const [currentPage, setCurrentPage] = useState("Home");

  const updatePage = page => {
    setCurrentPage(page);
  };
  return (
    <nav className="sidenav">
      <div className="head">
        <ul className="items">
          <li>
            <Link to="/" className="side-link">
              <Home page={currentPage} />
            </Link>
          </li>
          <li>
            <Link to="/search" className="side-link">
              <Search page={currentPage} />
            </Link>
          </li>
          <li>
            <Link to="/library" className="side-link">
              <SongsLib page={currentPage} />
            </Link>
          </li>
        </ul>
      </div>
      <div className="playlist">Playlist</div>
    </nav>
  );
};