import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/session_actions";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "../modal/modal";
import CreatePosting  from "../postings/create_posting";
import SuccessModal from "../modal/success-modal";

export default (props) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.session.isAuthenticated);
  const currentUser = useSelector(state => state.session.user);
  const modalObject = useSelector((state) => state.entities.modal); 

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }

  const [openModal, setModal] = useState(false);
  const [openSuccessModal, setSuccessModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false)
  };

  const showSuccessModal = () => {
    setSuccessModal(true);
  };

  const hideSuccessModal = () => {
    setSuccessModal(false);
  };

  useEffect(() => {
    if (modalObject.res === 200) {
      showSuccessModal();
    }
  }, [modalObject]);

  // Selectively render links dependent on whether the user is logged in
  const getLinks = () => {
    if (loggedIn) {

      return (
        <div className="nav-box-loggedin">
          <div className="nav-dropdown-trigger">
            <h1>
              Welcome{" "}
              <Link
                className="nav-current-user-profile-link"
                to={`/users/${currentUser.id}`}
              >
                {currentUser.firstName}
              </Link>
            </h1>
            <img
              className="nav-dropdown-trigger-icon"
              src="https://borrowme-pro.s3.us-east-2.amazonaws.com/icons/hamburger.png"
              alt=""
            />
            <div className="nav-dropdown-items">
              <ul>
                <li>
                  <Link className="nav-dropdown-link" to={"/home"}>
                    Home
                  </Link>
                </li>
                <li>
                  <div className="nav-dropdown-link" onClick={showModal}>
                    New Posting
                  </div>
                </li>
                <li>
                  <Link
                    className="nav-dropdown-link"
                    to={`/users/${currentUser.id}`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-dropdown-link"
                    onClick={logoutUser}
                    to="/login"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Modal show={openModal} handleClose={hideModal}>
            <CreatePosting
              className="create-posting-modal-box"
              hideSuccessModal={hideSuccessModal}
              showSuccessModal={showSuccessModal}
              showModal={showModal}
              hideModal={hideModal}
            />
          </Modal>
          <SuccessModal show={openSuccessModal} handleClose={hideSuccessModal}>
            <button onClick={hideSuccessModal}>X</button>
            <h1>Success!</h1>
          </SuccessModal>
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
