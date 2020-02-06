import React, { useState, useContext } from "react";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import "./sideBar.css";
import { FireStore as db } from "../../../../../utils/firebase.js";
import { AuthContext } from "../../../../../auth/Auth.js";
import Playlist from "./playlist.js";

const useStyles = makeStyles({
  Button: {
    color: "white",
    textTransform: "none",
    outline: "0 !important",
    fontSize: "13px",
    marginTop: "5px"
  },
  playlistButton: {
    color: "white",
    textTransform: "none",
    outline: "0 !important",
    fontSize: "13px",
    marginTop: "10px",
    marginLeft: "18px"
  },
  playlist: {
    borderRadius: 10,
    outline: "0 !important",
    marginLeft: "18px",
    backgroundColor: "gray",
    border: 0,
    width: "170px",
    textAlign: "center"
  },
  createButton: {
    marginLeft: "5px",
    marginTop: "-3px",
    fontSize: "30px",
    "&:hover": {
      color: "#1ed760",
      cursor: "pointer"
    }
  },
  cancelButton: {
    marginLeft: "5px",
    marginTop: "-3px",
    fontSize: "30px",
    "&:hover": {
      color: "red",
      cursor: "pointer"
    }
  }
});

const blackBox = () => (
  <svg viewBox="0 0 20 30" height="30px" width="20px">
    <rect width="4px" height="50px" fill="Black" />
  </svg>
);
const greenBox = () => (
  <svg viewBox="0 0 20 30" height="30px" width="20px">
    <rect width="4px" height="50px" fill="#1ed760" />
  </svg>
);

export default () => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [allowHome, setAllowHome] = useState(true);
  const [allowSearch, setAllowSearch] = useState(false);
  const [allowLibrary, setAllowLibrary] = useState(false);
  const [allowPlaylist, setAllowPlaylist] = useState(false);
  const [Name, setName] = useState("");

  const handleTextChange = e => {
    setName(e.target.value);
  };

  const createPlaylist = () => {
    setAllowPlaylist(false);

    db.collection("userPlaylist")
      .add({
        playlistName: Name,
        uid: currentUser.uid,
        keyID: Date.now()
      })
      .then(docRef => {
        console.log("document written with ID:", docRef.id);
        setName("");
      })
      .catch(error => {
        console.error("Error adding the document", error);
      });
  };

  const Home = () => {
    setAllowHome(true);
    setAllowSearch(false);
    setAllowLibrary(false);
  };
  const Search = () => {
    setAllowHome(false);
    setAllowSearch(true);
    setAllowLibrary(false);
  };

  const Library = () => {
    setAllowLibrary(true);
    setAllowSearch(false);
    setAllowHome(false);
  };

  return (
    <div>
      {!allowHome && blackBox()}
      {allowHome && greenBox()}
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          className={classes.Button}
          startIcon={<HomeOutlinedIcon style={{ fontSize: 30 }} />}
          onClick={Home}
        >
          Home
        </Button>
      </Link>
      <br />

      {!allowSearch && blackBox()}
      {allowSearch && greenBox()}
      <Link to="/search" style={{ textDecoration: "none" }}>
        <Button
          className={classes.Button}
          startIcon={<SearchOutlinedIcon style={{ fontSize: 30 }} />}
          onClick={Search}
        >
          Search
        </Button>
      </Link>
      <br />

      {!allowLibrary && blackBox()}
      {allowLibrary && greenBox()}
      <Link to="/library" style={{ textDecoration: "none" }}>
        <Button
          className={classes.Button}
          startIcon={<ListOutlinedIcon style={{ fontSize: 30 }} />}
          onClick={Library}
        >
          Library
        </Button>
      </Link>
      <br />
      <br />
      <Typography>Playlist</Typography>
      <Button
        className={classes.playlistButton}
        startIcon={<AddCircleOutlineOutlinedIcon style={{ fontSize: 30 }} />}
        onClick={() => {
          setAllowPlaylist(true);
        }}
      >
        Create Playlist
      </Button>
      {allowPlaylist && (
        <div>
          <input
            type="text"
            onChange={handleTextChange}
            placeholder="Playlist Name"
            required
            className={classes.playlist}
          />
          {Name.length ? (
            <CheckCircleIcon
              className={classes.createButton}
              onClick={createPlaylist}
            />
          ) : (
            <CancelIcon
              className={classes.cancelButton}
              onClick={() => {
                setAllowPlaylist(false);
              }}
            />
          )}
        </div>
      )}
      <Playlist />
    </div>
  );
};
