import React, { useState, useContext } from "react";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import { NavLink, Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import "./sideBar.css";
import { FireStore as db } from "../../../../../utils/firebase.js";
import { AuthContext } from "../../../../../auth/Auth.js";
import Playlist from "./playlist.js";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  holder: {
    display: "flex",
    flexDirection: "column",
    WebkitTransform: "scale(0.8, 0.8)"
  },
  Button: {
    color: "gray",
    textTransform: "none",
    outline: "0 !important",
    fontSize: "13px",
    marginTop: "10px",
    paddingLeft: "1em",
    display: "flex",
    "&:hover": {
      color: "white"
    }
  },
  playlistTypo: {
    fontSize: "13px",
    paddingLeft: "30px",
    color: "gray"
  },
  activeButton: {
    color: "white",
    borderLeft: " 3px solid #1ed760 "
  },
  buttonText: {
    marginLeft: "9px",
    marginTop: "3px"
  },
  playlistButton: {
    color: "white",
    textTransform: "none",
    outline: "0 !important",
    fontSize: "13px",
    marginTop: "10px",
    marginLeft: "8px",
    WebkitTransform: "scale(0.8, 0.8)"
  },
  dialogBox: {
    backgroundColor: "gray"
  },
  cancelButton: {
    borderRadius: 30,
    borderColor: "white",
    color: "white",
    outline: "none !important"
  },
  createButton: {
    color: "white",
    borderRadius: 30,
    backgroundColor: "#1ed760",
    outline: "none !important",
    "&:hover": {
      backgroundColor: "#1ed760"
    }
  },
  horizontal: {
    margin: "0px 12px 6px 15px",
    border: "0.5px solid rgb(110, 110, 110)"
  },
  "@media (min-width:921px)": {
    holder: {
      display: "flex",
      flexDirection: "column",
      WebkitTransform: "scale(1, 1)"
    },
    Button: {
      paddingLeft: "2em"
    },
    playlistButton: {
      WebkitTransform: "scale(1, 1)",
      marginLeft: "20px"
    },
    playlistTypo: {
      fontSize: "13px",
      paddingLeft: "25px"
    },
    horizontal: {
      margin: "10px 25px 10px 25px",
      border: "0.5px solid rgb(110, 110, 110)"
    }
  }
});

export default () => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [Name, setName] = useState("");

  const handleTextChange = e => {
    setName(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createPlaylist = () => {
    setOpen(false);
    if (Name.length > 0) {
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
    }
  };
  return (
    <div>
      <div className={classes.holder}>
        <NavLink
          exact
          to="/"
          style={{ textDecoration: "none" }}
          className={classes.Button}
          activeClassName={classes.activeButton}
        >
          <HomeOutlinedIcon style={{ fontSize: 30 }} />
          <div className={classes.buttonText}>Home</div>
        </NavLink>
        <NavLink
          to="/search"
          style={{ textDecoration: "none" }}
          className={classes.Button}
          activeClassName={classes.activeButton}
        >
          <SearchOutlinedIcon style={{ fontSize: 30 }} />

          <div className={classes.buttonText}> Search </div>
        </NavLink>

        <NavLink
          to="/library"
          style={{ textDecoration: "none" }}
          className={classes.Button}
          activeClassName={classes.activeButton}
        >
          <ListOutlinedIcon style={{ fontSize: 30 }} />

          <div className={classes.buttonText}> Library </div>
        </NavLink>
      </div>
      <br />

      <Typography className={classes.playlistTypo}>Playlist</Typography>
      <Button
        className={classes.playlistButton}
        startIcon={<AddCircleOutlineOutlinedIcon style={{ fontSize: 30 }} />}
        onClick={handleClickOpen}
      >
        Create Playlist
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <div className={classes.dialogBox}>
          <DialogTitle>Create New Playlist</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Playlist Name"
              type="text"
              onChange={handleTextChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              className={classes.cancelButton}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Link to="/library" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                onClick={createPlaylist}
                className={classes.createButton}
              >
                Create
              </Button>
            </Link>
          </DialogActions>
        </div>
      </Dialog>
      <hr className={classes.horizontal} />
      <Playlist />
    </div>
  );
};
