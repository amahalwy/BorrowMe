// src/components/nav/navbar.js

import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/session_actions";
import { useDispatch, useSelector } from 'react-redux';

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
        <div>
          <Link to={"/postings"}>All postings</Link>
          <Link to={"/profile"}>Profile</Link>
          {/* Might be doing a modal??? */}
          <Link to={"/new_posting"}>Create A Posting</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={"/signup"}>Signup</Link>
          <Link to={"/login"}>Login</Link>
        </div>
      );
    }
  }

  return (
    <div>
      <h1>Borrow ME!!</h1>
      {getLinks()}
    </div>
  );
}