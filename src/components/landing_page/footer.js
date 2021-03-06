import React from "react";
import { Link } from "react-router-dom";

import logo from "./images/logo2.png";
import "./styles/footer_style.css";

export default () => {
  return (
    <div className="container-fluid footer_part">
      <div className="contents">
        <div className="logo">
          <img src={logo} height="48" width="150" alt="Stopify" />
        </div>
        <Link to="/about">About</Link>
        <Link to="/contact">Contacts</Link>
      </div>
    </div>
  );
};
