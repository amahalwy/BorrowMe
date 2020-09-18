import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import FormData from "form-data";
// import ImageUploader from "react-images-upload";
import axios from 'axios';
import ProfileSideBar from './profile_side_bar';
import PostingsIndex from "../postings/profile_postings_index";
import {clearPostings, fetchUserPostings} from '../../actions/posting_actions';
import {fetchUser} from '../../actions/user_actions';
import { fetchRequestorRequests, fetchReceiverRequests} from '../../actions/request_actions';

import ProfileRequestorIndex from '../requests/posting_requestor_index';

export default props => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const currentUser = useSelector((state) => state.session.user);
  const postings = useSelector((state) =>
    Object.values(state.entities.postings)
  );
  const requestorRequests = useSelector((state) =>
    Object.values(state.entities.requests)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // incorporate full re-rendering over URL change
    dispatch(fetchUser(props.match.params.userId));
    dispatch(clearPostings());
    dispatch(fetchUserPostings(props.match.params.userId));
    dispatch(fetchRequestorRequests(props.match.params.userId));
    // dispatch(fetchReceiverRequests(props.match.params.userId));
  }, []);

  return (
    <div className="profile-container">
      <ProfileSideBar />
      <div className="profile-main-box">
        <div className="profile-postings">
          <h1>Postings</h1>
          <PostingsIndex postings={postings} />
        </div>
        <div className="profile-rentals">
          <h1>Rental Requests</h1>
          <ProfileRequestorIndex requests={requestorRequests} />
        </div>
      </div>
    </div>
  );
}