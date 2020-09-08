import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import FormData from "form-data";
import ImageUploader from "react-images-upload";
import axios from 'axios';
import ProfileSideBar from './profileSideBar';
import PostingsIndex from "../postings/profile_postings_index";
import {clearPostings, fetchUserPostings} from '../../actions/posting_actions';
import {fetchUser} from '../../actions/user_actions';
import ProfileBookings from './profile_bookings';

export default props => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const currentUser = useSelector(state => state.session.user);
  // const profileUser = useSelector(state => state.entities.user )
  const postings = useSelector(state => Object.values(state.entities.postings));
  const dispatch = useDispatch();
  
  useEffect(() => {
    // console.log(currentUser)
    dispatch(fetchUser());
    dispatch(clearPostings());
    dispatch(fetchUserPostings(currentUser.id));
  }, [])
  // debugger

  const submit = () => {
    const formData = new FormData();
    formData.append("email", currentUser.email);
    formData.append("file", profilePhoto);

    return axios.put(`/api/users/${currentUser.id}`, formData);
  }; 

  const onDrop = (picture) => {
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
      <ProfileSideBar />
      <div className="profile-main-box">
        <div className="profile-postings">
          <h1>Postings</h1>
          <PostingsIndex postings={postings} />
        </div>
        <div className="profile-rentals">
          <h1>Rentals</h1>
          <ProfileBookings postings={postings}/>
        </div>
      </div>
    </div>
  );
}