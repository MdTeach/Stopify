import React from "react";

import "./contacts.css";

function contact() {
  return (
    <div className="contact">
      <h1 className="devText">Developers</h1>
      <br />

      <div className="infobox">
        <h4 className="name">Abishek Bashyal</h4>
        <h6 className="email">(anishbasyal10@gmail.com)</h6>
      </div>
      <div className="infobox">
        <h4 className="name">Bibek Mishra</h4>
        <h6 className="email">(bibekmishra@gmail.com)</h6>
      </div>
      <div className="infobox">
        <h4 className="name">Prashanna Mani Paudel</h4>
        <h6 className="email">(prashannapaudel2@gmail.com)</h6>
      </div>
      <div className="infobox">
        <h4 className="name">Gautam Buddha Shakya</h4>
        <h6 className="email">(shakyagautam123@gmail.com)</h6>
      </div>
      <div className="infobox">
        <h4 className="name">Samip Timalsena</h4>
        <h6 className="email">(samip625@gmail.com)</h6>
      </div>
    </div>
  );
}

export default contact;
