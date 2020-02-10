import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "./images/logo2.png";
import "./styles/footer_style.css";

const Footer = () => {
  return (
    <div className="container-fluid footer_part">
      <div className="contents">
        <div className="logo">
          <img src={logo} height="64" width="200" alt="Stopify" />
        </div>
        <Link to="/">About</Link>
        <Link to="/">Help</Link>
        <Link to="/">Developers</Link>
      </div>
    </div>
  );
};

export default Footer;
