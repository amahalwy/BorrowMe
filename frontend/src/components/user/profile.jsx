import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { updateUserPhoto } from "../../actions/user_actions";
import FormData from "form-data";
import ImageUploader from "react-images-upload";
import axios from 'axios';

export default props => {

  // Class component for now, will need to be refactored maybe

  const [profilePhoto, setProfilePhoto] = useState(null);
  const currentUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  // Reference for the div
  const photoProfileUpload = React.createRef();

  const handleProfileFile = e => {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () =>
      setProfilePhoto(file);
      if (file) {
        reader.readAsDataURL(file);
      } else {
        setProfilePhoto(null);
      }
  }

  const updateUserPhoto = (userId, formData) => {
    debugger;
    return axios.post(`/api/users/${userId}`, formData)
    // .then(res => console.log(res))
    //, {
    //   headers: {
    //     "Content-Type": `multipart/form-data`,
    //   },
    // });
  };

  const coverProfileSubmit = () => {
    const formData = new FormData();
    formData["profilePhoto"]= profilePhoto;
    formData["_method"] =  "PATCH";
    debugger
    updateUserPhoto(currentUser.id, formData);
  }

  const profilePhotoUpload = () => {
    photoProfileUpload.current.click();
  }

  useEffect(() => {
    console.log("Use:",profilePhoto);
    if (profilePhoto) {
      console.log("UPDATED!!:", profilePhoto)
      debugger
      coverProfileSubmit()
    }
  }, [profilePhoto]);

  return (
    <div className="profile-container">
      <div className="profile-info-box">
        <h1>Profile</h1>
        <div className="profile-picture-box">
          <img
            className="profile-photo-img"
            src={currentUser.profilePhoto}
            alt="Profile Image"
          />
          {/* <ImageUploader
            withIcon={true}
            buttonText="Choose images"
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          /> */}

          <button onClick={profilePhotoUpload} className="camera-circle">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="camera"
              className="camera-icon"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"
              ></path>
            </svg>
            <input
              type="file"
              className="button-file"
              ref={photoProfileUpload}
              onChange={handleProfileFile}
            />
          </button>

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
      <div className="profile-main-box">
        <div className="profile-postings">
          <h1>Postings</h1>
          <p>All your postings here</p>
        </div>
        <div className="profile-rentals">
          <h1>Rentals</h1>
          <p>Current rentals and rental history here</p>
        </div>
      </div>
    </div>
  );}