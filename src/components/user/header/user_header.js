import React from 'react'

import logo from "../../landing_page/images/logo2.png";
import { handleLogout } from "../../../utils/firebase_login";
import {Link} from 'react-router-dom';


export default (props)=>{
    return(
        <nav className="top ">
        <div className="logo_content">
            <img src={logo} alt="logo" className="logoimg"></img>
        </div>

        <div className="profile_header">
            <div className="dropdown">
            <button
                className="btn btn-primary dropdown-toggle btn-sm"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            ></button>
            <div
                className="dropdown-menu pull-left"
                aria-labelledby="dropdownMenuButton"
            >
                <h5 className="dropdown-header" to="./">
                <img
                    className="profilepic"
                    src={props.currentUser.photoURL}
                    alt="Pic"
                />
                <b> | {props.currentUser.displayName}</b>
                <br />
                {props.currentUser.email}
                </h5>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item " to="#">
                Settings
                </Link>
                <Link className="dropdown-item " onClick={handleLogout}>
                Log Out
                </Link>
            </div>
            </div>
            <div className="welcome">
            Welcome, <b>{props.currentUser.displayName}</b>
            </div>
        </div>
        </nav>
    );
}