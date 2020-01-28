import React from "react";
import "./user_info.css";
import { handleLogout } from "../../../utils/firebase_login";
export default props => {
  return (
    <div className="contents">
      <img
        src={props.currentUser.photoURL}
        alt={props.currentUser.displayName}
        className="settings-pic"
      />
      <br />
      <h2 className="settings-name">{props.currentUser.displayName}</h2>
      <br />
      <button className="settings-button">View Account</button>
      <br />
      <button className="settings-button">Help</button>
      <br />
      <button className="settings-button" onClick={handleLogout}>
        Log Out
      </button>
      <br />
      <br />
    </div>
  );
};
