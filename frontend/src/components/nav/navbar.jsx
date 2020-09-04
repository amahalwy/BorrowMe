// src/components/nav/navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/session_actions";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "../modal/modal";
import CreatePosting  from "../postings/create_posting";

export default (props) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.session.isAuthenticated);
  const currentUser = useSelector(state => state.session.user);
  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }

  const [openModal, setModal] = useState(false);

  const showModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  // Selectively render links dependent on whether the user is logged in
  const getLinks = () => {
    if (loggedIn) {

      return (
        <div className="nav-box-loggedin">
          <div className="nav-dropdown-trigger">
            <h1>Welcome {currentUser.firstName}</h1>     
            <img className="nav-dropdown-trigger-icon" src="https://borrowme-pro.s3.us-east-2.amazonaws.com/icons/hamburger.png"/>
            <div className="nav-dropdown-items">
              <ul>
                <li><Link className="nav-dropdown-link" to={"/"}>Welcome</Link></li>
                <li><Link className="nav-dropdown-link" to={"/home"}>Home</Link></li>
                <li><Link className="nav-dropdown-link" onClick={showModal}>New Posting</Link></li>
                <li><Link className="nav-dropdown-link" to={"/profile"}>Profile</Link></li>
                <li><Link className="nav-dropdown-link" onClick={logoutUser} to="/">Logout</Link></li>
              </ul>
              
            </div>
          </div>
          <Modal show={openModal} handleClose={hideModal}>
            <CreatePosting hideModal={hideModal} />
          </Modal>
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
      <Link to="/"><img className="nav-logo" src="https://borrowme-pro.s3.us-east-2.amazonaws.com/icons/bm-logo.png" alt="bm-logo" />
      </Link> 
      <h2>BorrowMe</h2>
      {getLinks()}
    </div>
  );
};
