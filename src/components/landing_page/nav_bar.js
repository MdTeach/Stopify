import React, { Component } from "react";
import logo from "./images/logo2.png";
import "./styles/navbar_style.css";

import {
  NavLink,
  Link
} from "react-router-dom";


const NavBar = ()=>{
  
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark">
      <Link className="navbar-brand" to="/">
        <div className="col-6">
          <img src={logo} height="64" width="200" alt="Stopify" />
        </div>
      </Link>
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#collapse_target"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="collapse_target">
        <div className="col-12">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/help">
                Help
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link" >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
