import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import FormData from "form-data";
import ImageUploader from "react-images-upload";
import axios from 'axios';
import PostingsIndex from "../postings/profile_postings_index";


export default props => {
  const currentUser = useSelector(state => state.session.user)
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [filterList, setFilterList] = useState();

  // const handleProfileFile = e => {
  //   const reader = new FileReader();
  //   const file = e.currentTarget.files[0];
  //   reader.onloadend = () =>
  //     setProfilePhoto(file);
  //     if (file) {
  //       reader.readAsDataURL(file);
  //     } else {
  //       setProfilePhoto(null);
  //     }
  // }

  // const updateUserPhoto = (userId, formData) => {
  
  //   return axios.post(`/api/users/${userId}`, formData)
  // };

  // const coverProfileSubmit = () => {
  //   const formData = new FormData();
  //   formData["profilePhoto"]= profilePhoto;
  //   formData["_method"] =  "PATCH";
   
  //   updateUserPhoto(currentUser.id, formData);
  // }
  
  const fetchData = ownerId => {
    return fetch("/api/postings", {data: ownerId})
      .then(response => response.json())
      .then(data => {
        setFilterList(data);
      });
  };

  // const fetchUser = _id => {
  //   return fetch("/api/postings", { data: currentUser._id })
  //     .then((response) => response.json())
  //     .then((data) => {
  //     });
  // }

  useEffect(() => {
    console.log(profilePhoto);
    fetchData(currentUser._id);
    console.log("FETCH!!");
    console.log(profilePhoto);

  }, [profilePhoto])

  const submit = () => {
    const formData = new FormData();
    formData.append("email", currentUser.email);
    formData.append("file", profilePhoto);

    return axios.put(`/api/users/${currentUser.id}`, formData);
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
    <div className="profile-container">
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
      <div className="profile-main-box">
        <div className="profile-postings">
          <h1>Postings</h1>
          <PostingsIndex filterList={filterList} />
        </div>
        <div className="profile-rentals">
          <h1>Rentals</h1>
          <p>Current rentals and rental history here</p>
        </div>
      </div>
    </div>
  );
}