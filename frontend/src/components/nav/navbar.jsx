// src/components/nav/navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/session_actions";
import { useDispatch, useSelector } from 'react-redux';
import bmlogo from './bmlogo.png';
import Modal from "../modal/modal";
import CreatePosting  from "../postings/create_posting";

export default (props) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.session.isAuthenticated);

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
          <Link className="nav-button" to={"/postings"}>
            All postings
          </Link>
          <Link className="nav-button" to={"/profile"}>
            Profile
          </Link>
          {/* Might be doing a modal??? */}
          <Link
            className="nav-button"
            to={"/create-posting"}
            onClick={showModal}
          >
            Create A Posting
          </Link>
          <Link className="nav-button" onClick={logoutUser} to="/">
            Logout
          </Link>
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
      <Link to="/"><img className="nav-logo" src={bmlogo} alt="bm-logo" />
      </Link> 
      {getLinks()}
    </div>
  );
};
