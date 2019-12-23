import React, { Component } from "react";
import logo from "./images/logo2.png";
import "./styles/footer_style.css";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid footer_part">
        <div className="logo">
          <img src={logo} height="64" width="200" alt="Stopify" />
        </div>
        {/* <div className="contents">
          <ul>
            <li>
              <h4>
                <a href="#">About</a>
              </h4>
            </li>
            <li>
              <h4>
                <a href="#">Help</a>
              </h4>
            </li>
            <li>
              <h4>
                <a href="#">Developers</a>
              </h4>
            </li>
          </ul>
        </div> */}
      </div>
    );
  }
}

export default Footer;
