import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import { createBooking, clearBookings, fetchOwnerBookings, fetchRenterBookings} from '../../actions/booking_actions';
import { fetchRequestorRequests, fetchReceiverRequests, clearRequests, deleteRequest} from '../../actions/request_actions';
import FormData from 'form-data';

export default (props) => {
  const currentUser = useSelector(state => state.session.user); 
  const dispatch = useDispatch();

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
      dispatch(fetchOwnerBookings(currentUser.id));
      dispatch(fetchRenterBookings(currentUser.id));
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
      <span>Requestor: {props.request.requestorName}</span>
      <br />
      <span>
        Start date:{" "}
        {props.request.requestDates[0].split(" ").splice(0, 4).join(" ")}
      </span>
      <br />
      <div className="request-buttons-nomo">
        <span>
          <button className="accept-button-nomo" onClick={acceptRequest}>
            Accept
          </button>
        </span>
        <span>
          <button className="reject-button-nomo" onClick={declineRequest}>
            Decline
          </button>
        </span>
      </div>
    </div>
  );
};
