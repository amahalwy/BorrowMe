import React, { useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { createBooking, clearBookings, fetchUserBookings} from '../../actions/booking_actions';
import { fetchRequestorRequests, fetchReceiverRequests, clearRequests, deleteRequest} from '../../actions/request_actions';
import Modal from "../modal/modal";
import PostingRequestorShow from "./posting_requestor_show";
import FormData from 'form-data';

export default (props) => {
  const currentUser = useSelector(state => state.session.user); 
  const dispatch = useDispatch();


  const [openModal, setModal] = useState(false);

  const showModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const acceptRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ownerId", currentUser.id)
    formData.append("requestorId", props.request.requestorId)
    formData.append("requestorName", props.request.requestorName)
    formData.append("postingId", props.request.postingId)
    formData.append("requestDates", props.request.requestDates)
    formData.append("price", props.request.amount)
    formData.append("bookingImage", props.request.postingImage)

    dispatch(createBooking(formData));
    setTimeout(() => {
      dispatch(clearBookings());
      dispatch(fetchUserBookings(currentUser.id));
      dispatch(deleteRequest(props.request._id));
      dispatch(clearRequests());
    }, 200)
    setTimeout(() => {
      dispatch(fetchRequestorRequests(currentUser.id));
      dispatch(fetchReceiverRequests(currentUser.id));
    }, 500)
  }

  const declineRequest = (e) => {
    e.preventDefault();
    dispatch(deleteRequest(props.request._id));
    setTimeout(() => {
      dispatch(clearRequests());
      dispatch(fetchRequestorRequests(currentUser.id));
      dispatch(fetchReceiverRequests(currentUser.id));
    }, 1)
  }

  return (
    <div className="postings-index-image-box">
      <img
        className="postings-index-image"
        src={props.request.postingImage}
        alt=""
      />
      <span></span>
      <Modal show={openModal} handleClose={hideModal}>
        <PostingRequestorShow
          title={props.request.postingTitle}
          image={props.request.postingImage}
          amount={props.request.amount}
          user={props.request.requestorName}
          requestDates={props.request.requestDates}
          hideModal={hideModal}
        />
      </Modal>
      <span>Requestor: {props.request.requestorName}</span>
      <span>Start date: {props.request.requestDates[0]}</span>
      <div>
        <button onClick={acceptRequest}>Accept</button>
      </div>
      <div>
        <button onClick={declineRequest}>Decline</button>
      </div>
    </div>
  );
};
