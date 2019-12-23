import React, { Component } from "react";
import {Link} from "react-router-dom";

import logo from "./images/logo2.png";
import "./styles/navigation_style.css";

const  Navigation = ()=>{
  return (
    <React.Fragment>
      <div className="main_nav">
        <div className="logopic">
          <Link href="https://www.google.com">
            <img src={logo} height="64" width="200" alt="Stopify" />
          </Link>
        </div>

        <div className="navigations">
          <ul>
            <li>
              <Link href="https://www.google.com">Contact</Link>
            </li>
            <li>
              <Link href="https://www.google.com">Help</Link>
            </li>
            <li>
              <Link href="https://www.google.com">Log In</Link>
            </li>
            <li>
              <Link href="https://www.google.com">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navigation;
