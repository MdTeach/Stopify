import React, { Component } from "react";
import logo from "./images/logo2.png";
import "./styles/navigation_style.css";

class Navigation extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="main_nav">
          <div className="logopic">
            <a href="https://www.google.com">
              <img src={logo} height="64" width="200" alt="Stopify" />
            </a>
          </div>

          <div className="navigations">
            <ul>
              <li>
                <a href="https://www.google.com">Contact</a>
              </li>
              <li>
                <a href="https://www.google.com">Help</a>
              </li>
              <li>
                <a href="https://www.google.com">Log In</a>
              </li>
              <li>
                <a href="https://www.google.com">Sign Up</a>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Navigation;
