import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/session_actions";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "../modal/modal";
import CreatePosting  from "../postings/create_posting";
import SuccessModal from "../modal/success-modal";
import {clearModal} from '../../actions/posting_actions';
import HomeFooter from '../home/home_footer'

export default (props) => {
  const loggedIn = useSelector(state => state.session.isAuthenticated);
  const currentUser = useSelector(state => state.session.user);
  const modalObject = useSelector((state) => state.entities.modal); 
  const modalType = "nav";

  const dispatch = useDispatch();

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
    dispatch(clearModal());
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
            {/* <h1 className="nav-current-user-profile-link">
              Welcome{" "}
              {currentUser.firstName}
            </h1> */}
            <h2 className="welcome">Welcome <Link className="nav-current-user-profile-link" to={`/users/${currentUser.id}`}>{currentUser.firstName}</Link></h2>
            <div className="nav-dropdown-trigger">
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
          <Modal show={openModal} handleClose={hideModal} modalType={modalType}>
            <CreatePosting
              className="create-posting-modal-box"
              hideSuccessModal={hideSuccessModal}
              showSuccessModal={showSuccessModal}
              showModal={showModal}
              hideModal={hideModal}
            />
          </Modal>
          <SuccessModal show={openSuccessModal} handleClose={hideSuccessModal}>
            <button className="success-modal-x" onClick={() => {
              hideSuccessModal();
              hideModal();
            }}>X</button>
            <h1 className="success-modal-message">Success!</h1>
          </SuccessModal>
          <HomeFooter></HomeFooter>
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
