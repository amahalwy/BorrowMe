// src/components/nav/navbar.js

import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/session_actions";
import { useDispatch, useSelector } from 'react-redux';
import bmlogo from './bmlogo.png';

export default (props) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.session.isAuthenticated);

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }

  // Selectively render links dependent on whether the user is logged in
  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="nav-box-loggedin">
          <div className="nav-dropdown-trigger">
            <img className="nav-dropdown-trigger-icon" src="https://www.iconsdb.com/icons/preview/white/arrow-206-xxl.png" alt="dropdown-trigger"/>
            <div className="nav-dropdown-items">
              <ul>
                <li><Link className="nav-dropdown-link" to={"/"}>Welcome</Link></li>
                <li><Link className="nav-dropdown-link" to={"/home"}>Home</Link></li>
                <li><Link className="nav-dropdown-link" to={"/create-posting"}>New Posting</Link></li>
                <li><Link className="nav-dropdown-link" to={"/profile"}>Profile</Link></li>
                <li><Link className="nav-dropdown-link" onClick={logoutUser} to="/">Logout</Link></li>
              </ul>
              
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="nav-box-loggedout">
          <div className="nav-buttons">
            <Link className="nav-button" to={"/signup"}>
              Signup
            </Link>
            <Link className="nav-button" to={"/login"}>
              Login
            </Link>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="nav-logo-box">
      <Link to="/"><img className="nav-logo" src={bmlogo} alt="bm-logo" />
      </Link> 
      <h2>BorrowMe</h2>
      {getLinks()}
    </div>
  );
}