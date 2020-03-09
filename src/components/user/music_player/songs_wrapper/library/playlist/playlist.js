import React, { useState, useEffect, useContext } from "react";
import { FireStore as db } from "../../../../../../utils/firebase";
import { AuthContext } from "../../../../../../auth/Auth";
import PlaylistCard from "./playlistCard.js";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { makeStyles } from "@material-ui/core";

import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column"
  },

  empty: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    margin: "15px 0px 30px 0px",
    fontSize: "18px",
    fontWeight: 700
  },
  playlistButton: {
    padding: "5px 15px 5px 15px",
    borderRadius: "200px",
    borderStyle: "none",
    color: "black",
    backgroundColor: "white",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "1px",
    margin: "0px",
    outline: "0 !important"
  },
  icon: {
    fontSize: 40,
    marginTop: 20
  },
  createButton: {
    backgroundColor: "rgb(7, 184, 84)",
    color: "white",
    fontWeight: 500
  },
  cancelButton: {
    fontWeight: 500
  },
  "@media (min-width: 921px)": {
    container: {
      flexDirection: "row"
    },
    text: {
      margin: "30px 0px 30px 0px",
      fontSize: "48px",
      fontWeight: 700
    },
    playlistButton: {
      padding: "10px 30px 10px 30px",
      fontSize: "12px",
      letterSpacing: "1.5px",
      margin: "20px 0px 0px 0px",
      "&:hover": {
        border: "3px solid white"
      }
    },
    icon: {
      fontSize: 60,
      marginTop: 40
    }
  }
});

export default () => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [allPlaylist, setAllPlaylist] = useState([]);
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

  const getPlaylistInfo = async () => {
    db.collection("userPlaylist")
      .where("uid", "==", currentUser.uid)
      .get()
      .then(querySnapshot => {
        const playlist = querySnapshot.docs.map(el => el.data());
        setAllPlaylist(playlist);
        console.log("playlist card refreshed");
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getPlaylistInfo();

    //set the listener as user add or deletes items to the playlist
    db.collection("userPlaylist")
      .where("uid", "==", currentUser.uid)
      .onSnapshot(
        function(_) {
          getPlaylistInfo();
        },
        function(error) {
          console.log(error, "Error");
        }
      );
  }, []);

  return (
    <div className={classes.container}>
      {allPlaylist.length === 0 ? (
        <div className={classes.empty}>
          <LibraryMusicIcon className={classes.icon} />

          <h1 className={classes.text}>Create your first playlist</h1>
          <button className={classes.playlistButton} onClick={handleClickOpen}>
            CREATE NEW PLAYLIST
          </button>
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
        </div>
      ) : (
        allPlaylist.map(el => <PlaylistCard key={el["keyID"]} data={el} />)
      )}
    </div>
  );
};
