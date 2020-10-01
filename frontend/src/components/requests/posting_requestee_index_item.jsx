import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import { createBooking, clearBookings, fetchOwnerBookings, fetchRenterBookings} from '../../actions/booking_actions';
import { fetchRequestorRequests, fetchReceiverRequests, clearRequests, deleteRequest, clickRequest} from '../../actions/request_actions';

export default (props) => {
  const currentUser = useSelector(state => state.session.user); 
  const dispatch = useDispatch();

  const handle = () => {
    dispatch(clickRequest(props.request._id));
    setTimeout(() => {
      props.showModal();
    }, 1)
  }

  return (
    <div className="postings-index-image-box" onClick={handle}>
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
      <div className="request-buttons">
        <span>
          <button className="accept-request">Accept</button>
        </span>
        <span>
          <button className="reject-request">Reject</button>
        </span>
      </div>
    </div>
  );
};
