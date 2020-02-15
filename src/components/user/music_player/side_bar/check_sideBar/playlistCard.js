import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CardContext } from "../../audio_utils/card_utils";

const useStyles = makeStyles({
  cardHolder: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "2em"
  },
  card: {
    fontSize: "13px",
    paddingBottom: "5px",
    color: "gray",
    "&:hover": {
      color: "white"
    }
  },
  activeCard: {
    color: "white",
    "&:hover": {
      color: "white"
    }
  }
});

export default props => {
  const classes = useStyles();
  const CardDetails = useContext(CardContext);
  const playlistDetails = () => {
    CardDetails.feedPlaylist(props.data["playlistName"]);
  };
  return (
    <div className={classes.cardHolder}>
      <NavLink
        to={"/userPlaylist/" + props.data["playlistName"]}
        style={{ textDecoration: "none" }}
        className={classes.card}
        activeClassName={classes.activeCard}
        onClick={playlistDetails}
      >
        {props.data["playlistName"]}
      </NavLink>
    </div>
  );
};
