import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./NavBar.css";

const NavBar = (props) => {
  let nav = props.user ? (
    <div className="nav">
      <Link to="/tbd" className="whiteText text-muted">
        TBD
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link
        onClick={props.handleLogout}
        to="/login"
        className="whiteText text-muted"
      >
        LOG OUT
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link to="/home" className="whiteText text-muted">
        HOME
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <span className="NavBar-welcome">WELCOME, {props.user.name}</span>
    </div>
  ) : (
    <div>
      <Link to="/login" className="NavBar-link">
        LOG IN
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="/signup" className="NavBar-link">
        SIGN UP
      </Link>
    </div>
  );

  return <div className="NavBar">{nav}</div>;
};

export default NavBar;
