import React, { useState, useContext } from "react";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Link } from "react-router-dom";
import { CardContext } from "../../../audio_utils/card_utils";

const useStyles = makeStyles({
  card: {
    height: "8.5em",
    width: "6em",
    marginLeft: 20,
    backgroundColor: "#242323",
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5
  },
  songImage: {
    width: "4.75em",
    height: "5em"
  },
  songName: {
    padding: "4px 0px 4px 0px",
    textAlign: "left",
    color: "blanchedalmond",
    fontFamily: "Helvetica",
    fontSize: "8px",
    display: "flex",
    flexWrap: "wrap"
  },
  songArtist: {
    color: "rgb(156, 156, 156);",
    fontFamily: "Cambria",
    fontSize: "7px",
    float: "left"
  },
  playIcon: {
    color: "white",
    backgroundColor: "#1ed760",
    fontSize: "20px",
    borderRadius: "30px",
    padding: 4,
    marginLeft: "auto",
    marginTop: "-1px",
    "&:hover": {
      cursor: "pointer",
      fontSize: "20px"
    }
  },
  "@media(min-width: 921px)": {
    card: {
      height: "17em",
      width: "12em"
    },
    songImage: {
      width: "9.5em",
      height: "10em",
      marginLeft: "3px"
    },
    songName: {
      padding: "8px 0px 8px 0px",
      textAlign: "left",
      color: "blanchedalmond",
      fontFamily: "Helvetica",
      fontSize: "16px",
      display: "flex",
      flexWrap: "wrap"
    },
    songArtist: {
      color: "rgb(156, 156, 156);",
      fontFamily: "Cambria",
      fontSize: "14px",
      float: "left"
    },
    playIcon: {
      color: "white",
      backgroundColor: "#1ed760",
      fontSize: "40px",
      borderRadius: "30px",
      padding: 8,
      marginLeft: "auto",
      marginTop: "-6px",
      "&:hover": {
        cursor: "pointer",
        fontSize: "40px"
      }
    }
  }
});

export default props => {
  const classes = useStyles();
  const CardDetails = useContext(CardContext);
  const [over, setOver] = useState(false);

  const cardDetails = () => {
    CardDetails.feedSong(props.data);
  };
  return (
    <Card
      variant="outlined"
      className={classes.card}
      onMouseOver={() => {
        setOver(true);
      }}
      onMouseLeave={() => {
        setOver(false);
      }}
    >
      <CardContent>
        <Link
          to={"/album/" + props.data.name}
          style={{ textDecoration: "none" }}
        >
          <div onClick={cardDetails}>
            <img
              className={classes.songImage}
              src={props.data.imageUrl}
              alt={props.data.imageUrl}
            />
            <div className={classes.songName}>
              {props.data.name.length >= 20
                ? props.data.name.substr(0, 17) + "..."
                : props.data.name}
            </div>
          </div>
        </Link>
        <div style={{ display: "flex" }}>
          <div className={classes.songArtist}>{props.data.artist}</div>

          {over && <PlayArrowIcon className={classes.playIcon} />}
        </div>
      </CardContent>
    </Card>
  );
};
