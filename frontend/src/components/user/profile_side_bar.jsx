import React, { useState, useEffect } from 'react';
import ImageUploader from "react-images-upload";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPhoto} from '../../actions/user_actions';
// import axios from 'axios';

const ProfileSideBar = props => {
  const currentUser = useSelector(state => state.session.user)
  const [profilePhoto, setProfilePhoto] = useState(null);
  const dispatch = useDispatch();

  const submit = () => {
    const formData = new FormData();
    formData.append("email", currentUser.email);
    formData.append("file", profilePhoto);

    dispatch(updateUserPhoto(currentUser.id, formData))
    // return axios.put(`/api/users/${currentUser.id}`, formData);
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

  return (
    <div className="profile-info-box">
      <h1>Profile</h1>
      <div className="profile-picture-box">
        <img
          className="profile-photo-img"
          src="https://borrowme-pro.s3.us-east-2.amazonaws.com/icons/profile-default.png"
          alt="Profile Image"
        />
        <ImageUploader
          withIcon={true}
          buttonText="Choose Image"
          onChange={onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        />
      </div>
      <div className="profile-user-info">
        <h2>{currentUser.firstName}</h2>
        <h2>{currentUser.lastName}</h2>
        <h2>{currentUser.email}</h2>
        <h2>{currentUser.address}</h2>
        <h2>Change Password</h2>
      </div>
      <div className="profile-edit-button-container">
        <button className="profile-edit-button">Edit Profile</button>
      </div>
    </div>
  )
}

export default ProfileSideBar;