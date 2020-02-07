import React,{useState} from "react";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import logo from "../../landing_page/images/logo2.png";
import { handleLogout } from "../../../utils/firebase_login";
import { Link } from "react-router-dom";
import "./user_header.css";
import {withStyles,makeStyles} from '@material-ui/core/styles'


const StyledMenuItem = withStyles(theme => ({
  root: {
      backgroundColor:"#363636",
      color:"gray",
      margin:-8,
      paddingRight:95,

    '&:hover': {
      backgroundColor: "#363636",
      color:"white"
    },
  },
}))(MenuItem);

const useStyles=makeStyles({
  menu:{
    marginLeft:20,
    marginTop:35
    
  }
})






export default props => {
  const classes=useStyles();
  const [anchorEl,setAnchorEl]=React.useState(null);
    const open=Boolean(anchorEl);
    const handleClick=e=>{
        setAnchorEl(e.currentTarget);
    }
    const handleClose=e=>{
        setAnchorEl(null)
    }
  return (
    <nav className="top ">
      <div className="logo_content">
        <img src={logo} alt="logo" className="logoimg"></img> 
      </div>
      <div className="middle">
        <div className="back_buttons">
          <button id="backb">
            <svg height="22" width="22" viewBox="0 0 24 24">
              <path
                fill="white"
                d="M15.54 21.15L5.095 12.23 15.54 3.31l.65.76-9.555 8.16 9.555 8.16"
              ></path>
            </svg>
          </button>

          <button id="backb">
            <svg height="22" width="22" viewBox="0 0 24 24">
              <path
                fill="white"
                d="M7.96 21.15l-.65-.76 9.555-8.16L7.31 4.07l.65-.76 10.445 8.92"
              ></path>
            </svg>
          </button>
        </div>
        
          <button className="welcome" onClick={handleClick}>
            <img
              className="profilepic"
              src={props.currentUser.photoURL}
              alt="profile_pic"
            />
            <b id="pp_username">{props.currentUser.displayName}</b>
          </button>
          <Menu anchorEl={anchorEl} keepMounted open={open} className={classes.menu} onClose={handleClose}  >
          <Link to="/" style={{textDecoration:"none"}}>
                    <StyledMenuItem onClick={handleLogout}>Logout</StyledMenuItem>
                    </Link>
                    
          </Menu>
        
      </div>
    </nav>
  );
};
