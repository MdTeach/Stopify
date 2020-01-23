import React, { useState, useEffect } from "react";

import Home from "./buttons/HomeB";
import Search from "./buttons/Search";
import SongsLib from "./buttons/songsLib";
import "./side_bar.css";

export default () => {
  const [currentPage, setCurrentPage] = useState("Home");

  const updatePage = page => {
    setCurrentPage(page);
  };
  return (
    <nav className="sidenav">
      <div className="head">
        <ul className="items">
          <li onClick={() => updatePage("Home")}>
            <Home page={currentPage} />
          </li>
          <li onClick={() => updatePage("Search")}>
            <Search page={currentPage} />
          </li>
          <li onClick={() => updatePage("Library")}>
            <SongsLib page={currentPage} />
          </li>
        </ul>
      </div>
      <div>Playlist</div>
    </nav>
  );
};
