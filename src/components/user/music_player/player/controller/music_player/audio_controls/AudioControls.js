import React from "react";

//material ui

//play pause
import PlayCircleOutlineRoundedIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineRoundedIcon from "@material-ui/icons/PauseCircleOutline";

//skip next
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";

//shuffle button
import ShuffleIcon from "@material-ui/icons/Shuffle";

//loop button
import LoopIcon from "@material-ui/icons/Loop";

import { makeStyles } from "@material-ui/core/styles";

import "./AudioControls.css";

//defining the styles for the button
const useStyles = makeStyles({
  Button: {
    marginLeft: ".25em",
    marginRight: ".25em",
    color: "#b3b3b3",
    fontSize: "1.6em",
    "&:hover": {
      color: "white"
    }
  },
  ppButton: {
    marginLeft: ".25em",
    marginRight: ".25em",
    color: "#b3b3b3",
    fontSize: "3em",
    "&:hover": {
      color: "white"
    }
  }
});

export default props => {
  //for the styling
  const classes = useStyles();

  const handlePlayPause = () => {
    props.handlePlayPause();
  };

  return (
    <div className="control-buttons">
      <ShuffleIcon className={classes.Button} />
      <SkipPreviousIcon className={classes.Button} />
      {props.isPaused ? (
        <PlayCircleOutlineRoundedIcon
          className={classes.ppButton}
          onClick={handlePlayPause}
        />
      ) : (
        <PauseCircleOutlineRoundedIcon
          className={classes.ppButton}
          onClick={handlePlayPause}
        />
      )}
      <SkipNextIcon className={classes.Button} />
      <LoopIcon className={classes.Button} />
    </div>
  );
};
