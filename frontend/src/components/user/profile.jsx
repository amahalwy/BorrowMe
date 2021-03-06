import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {fetchUser} from '../../actions/user_actions';
import {clearPostings, fetchUserPostings} from '../../actions/posting_actions';
import {clearRequests, fetchRequestorRequests, fetchReceiverRequests} from '../../actions/request_actions';
import { clearBookings, fetchOwnerBookings, fetchRenterBookings} from '../../actions/booking_actions';

import Modal from '../modal/modal';
import ItemShow from './item_show';
import ProfileSideBar from './profile_side_bar';
import ProfileRequesteeIndex from "../requests/posting_requestee_index";
import ProfileRequestorIndex from '../requests/posting_requestor_index';
import BookingsIndex from '../booking/booking_index';

export default props => {
  const postings = useSelector((state) =>
    Object.values(state.entities.postings)
  );
  const requestorRequests = useSelector((state) =>
    Object.values(state.entities.requestorRequests)
  );
  const receiverRequests = useSelector((state) =>
    Object.values(state.entities.receiverRequests)
  );
  const ownerBookings = useSelector((state) =>
    Object.values(state.entities.ownerBookings)
  );
  const renterBookings = useSelector((state) =>
    Object.values(state.entities.renterBookings)
  );

  const currentUser = useSelector((state) => state.entities.users.user); 
  const modalType = "profile";
  
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(fetchUser(props.match.params.userId));

    dispatch(clearPostings());
    dispatch(fetchUserPostings(props.match.params.userId));

    dispatch(clearRequests());
    dispatch(fetchRequestorRequests(props.match.params.userId));
    dispatch(fetchReceiverRequests(props.match.params.userId));

    dispatch(clearBookings());
    dispatch(fetchOwnerBookings(props.match.params.userId));
    dispatch(fetchRenterBookings(props.match.params.userId));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [openModal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  }

  const hideModal = () => {
    setModal(false);
  }

  if (!currentUser) return '';
  return (
    <div className="profile-container">
      <ProfileSideBar postings={postings} />
      <div className="profile-main-box">
        <div className="profile-rentals">
          <h1>Your upcoming bookings </h1>
          <BookingsIndex bookings={renterBookings} showModal={showModal}/>
        </div>
        <div className="profile-rentals">
          <h1>Upcoming bookings </h1>
          <div className="Upcoming-Bookings">
            <BookingsIndex bookings={ownerBookings} showModal={showModal} />
          </div>
        </div>
      </div>
      <div className="profile-main-box">
        <div className="profile-rentals">
          <h1>Requested Items </h1>
          <ProfileRequestorIndex requests={requestorRequests} showModal={showModal}/>
        </div>
        <div className="profile-rentals">
          <h1>Received Requests</h1>
          <ProfileRequesteeIndex requests={receiverRequests} showModal={showModal}/>
        </div>
      </div>
      <Modal show={openModal} handleClose={hideModal} modalType={modalType}>
        <ItemShow hideModal={hideModal} currentUser={currentUser}/>
      </Modal>
    </div>
  );
}