import React, { Component } from "react";
import logo from "./images/logo2.png";
import "./styles/navbar_style.css";
import Auth from "./auth.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const NavBar = ()=>{
  
  return (
    <Router>
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark">
      <a className="navbar-brand" href="#">
        <div className="col-6">
          <img src={logo} height="64" width="200" alt="Stopify" />
        </div>
      </a>
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
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Help
              </a>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Switch>
          <Route path="/login">
              <Auth/>
          </Route>
        </Switch>
    </nav>
    </Router>
  );
}

export default NavBar;
