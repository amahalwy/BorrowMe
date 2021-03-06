import React, { useState } from 'react';
import {useSelector } from "react-redux";
import Modal from "../modal/modal";
import EditProfileModal from './edit_profile_modal';
import ProfilePostingsIndex from '../postings/profile_postings_index';

const ProfileSideBar = props => {
  const activeUser = useSelector(state => state.entities.users.user);
  const currentUser = useSelector(state => state.session.user);
  const modalType = "profile-side";

  const [openModal, setModal] = useState(false);

  const showModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const userActions = () => {
    if (activeUser._id === currentUser.id) {
    return (
          <div className="profile-edit-button-container">
            <button className="profile-edit-button" onClick={showModal}>Edit Profile</button>
          </div>
      )
    }
  }

  return (
    <div className="profile-info-box">
      <h1>Profile</h1>
      <div className="profile-picture-box">
        <img
          className="profile-photo-img"
          src={activeUser.profilePhoto}
          alt=""
        />
      </div>
      <div className="profile-user-info">
        <h2>{activeUser.firstName}</h2>
        <h2>{activeUser.lastName}</h2>
        <h2>{activeUser.email}</h2>
        <h2>{activeUser.address}</h2>
      </div>
      {userActions()}
      <Modal show={openModal} handleClose={hideModal} modalType={modalType}>
        <EditProfileModal hideModal={hideModal} />
      </Modal>
      <ProfilePostingsIndex postings={props.postings} />
    </div>
  )
}

export default ProfileSideBar;