import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import FormData from "form-data";
// import ImageUploader from "react-images-upload";
import axios from 'axios';
import ProfileSideBar from './profile_side_bar';
import PostingsIndex from "../postings/profile_postings_index";
import {clearPostings, fetchUserPostings} from '../../actions/posting_actions';
import {fetchUser} from '../../actions/user_actions';

export default props => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const currentUser = useSelector(state => state.session.user);
  const postings = useSelector(state => Object.values(state.entities.postings));
  const dispatch = useDispatch();
    // 
    // 
    // 
  
  useEffect(() => {
    // incorporate full re-rendering over URL change
    dispatch(fetchUser(props.match.params.userId));
    dispatch(clearPostings());
    dispatch(fetchUserPostings(props.match.params.userId));
    // 
    // 
    // 
  }, [])

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
          <p>Current rentals and rental history here</p>
        </div>
      </div>
    </div>
  );
}