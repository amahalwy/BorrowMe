import React, { useState, useEffect } from 'react';
import ImageUploader from "react-images-upload";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/modal";
import axios from 'axios';
import EditProfileModal from './editProfileModal';
// import { profile } from 'console';

const ProfileSideBar = props => {
  const activeUser = useSelector(state => state.entities.users.user);
  const currentUser = useSelector(state => state.session.user);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const dispatch = useDispatch();

  const [openModal, setModal] = useState(false);

  const showModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const submit = () => {
    const formData = new FormData();
    formData.append("email", currentUser.email);
    formData.append("file", profilePhoto);

    return axios.put(`/api/users/${currentUser.id}`, formData);
  }; 

  const hideModal = () => {
    setModal(false);
  };

  const onDrop = (picture) => {
    // console.log("picture: ", picture)
    // console.log("picture222: ", picture[0]);

    setProfilePhoto(picture[0]);
    // console.log("photooo:", profilePhoto);

    // const formData = new FormData();
    // formData.append("firstName", currentUser.firstName);
    // formData.append("lastName", currentUser.lastName);
    // formData.append("email", currentUser.email);
    // formData.append("address", currentUser.address);
    // formData.append("city", currentUser.city);
    // formData.append("state", currentUser.state);
    // formData.append("zipCode", currentUser.zipCode);
    // formData.append("file", profilePhoto);

    // return axios.put(`/api/users/${currentUser.id}`, formData);
    setTimeout(() => {
      submit()
    }, 3000);
  }

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
          alt="Profile Image"
        />
      </div>
      <div className="profile-user-info">
        <h2>{activeUser.firstName}</h2>
        <h2>{activeUser.lastName}</h2>
        <h2>{activeUser.email}</h2>
        <h2>{activeUser.address}</h2>
      </div>
      {userActions()}
      <Modal show={openModal} handleClose={hideModal}>
        <EditProfileModal hideModal={hideModal} />
      </Modal>
    </div>
    )
}

export default ProfileSideBar;