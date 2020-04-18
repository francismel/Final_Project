import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.css";

const NavBar = (props) => {
  let nav = props.user ? (
    <div className="nav">
      <NavLink
        to="/about"
        activeStyle={{ color: "white" }}
        className="whiteText text-muted"
      >
        ABOUT
      </NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <NavLink
        onClick={props.handleLogout}
        to="/login"
        activeStyle={{ color: "white" }}
        className="whiteText text-muted"
      >
        LOG OUT
      </NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <span className="NavBar-welcome">WELCOME, {props.user.name}</span>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <NavLink to="/home" className="whiteText text-muted">
        HOME
      </NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <NavLink to="/edit" className="whiteText text-muted">
        EDIT
      </NavLink>
    </div>
  ) : (
    <div className="nav">
      <NavLink to="/login" className="whiteText text-muted">
        LOG IN
      </NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <NavLink
        onClick={props.handleLogout}
        to="/signup"
        className="whiteText text-muted"
      >
        SIGN UP
      </NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    </div>
  );

  return <div className="NavBar">{nav}</div>;
};

export default NavBar;
