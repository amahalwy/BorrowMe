import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { createBooking, clearBookings, fetchOwnerBookings, fetchRenterBookings } from '../../actions/booking_actions';
import { fetchRequestorRequests, fetchReceiverRequests, clearRequests, deleteRequest, clickRequest } from '../../actions/request_actions';

export default props => {
  const modalObject = useSelector((state) => state.entities.modal); 
  const dispatch = useDispatch();

  const ownerButtons = () => {
    if (!modalObject) {
      return ''
    } else if (modalObject.receiverId && modalObject.receiverId === props.currentUser._id) {
      return (
        <div className="request-buttons">
          <span>
            <button className="accept-request" onClick={acceptRequest}>Accept</button>
          </span>
          <span>
            <button className="reject-request" onClick={declineRequest}>Reject</button>
          </span>
        </div>
      )
    }
  }

  const acceptRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ownerId", props.currentUser.id)
    formData.append("requestorId", modalObject.requestorId)
    formData.append("requestorName", modalObject.requestorName)
    formData.append("postingId", modalObject.postingId)
    formData.append("requestDates", modalObject.requestDates)
    formData.append("price", modalObject.amount)
    formData.append("bookingImage", modalObject.postingImage)

    dispatch(createBooking(formData));
    setTimeout(() => {
      dispatch(clearBookings());
      dispatch(fetchOwnerBookings(props.currentUser.id));
      dispatch(fetchRenterBookings(props.currentUser.id));
      dispatch(deleteRequest(modalObject._id));
      dispatch(clearRequests());
    }, 200)
    setTimeout(() => {
      dispatch(fetchRequestorRequests(props.currentUser._id));
      dispatch(fetchReceiverRequests(props.currentUser._id));
    }, 500)
  }

  const declineRequest = (e) => {
    e.preventDefault();
    dispatch(deleteRequest(modalObject._id));
    setTimeout(() => {
      dispatch(clearRequests());
      dispatch(fetchRequestorRequests(props.currentUser._id));
      dispatch(fetchReceiverRequests(props.currentUser._id));
    }, 1)
  }

  useEffect(() => {
  }, [modalObject])

  // const totalAmount = props.amount * props.requestDates.length;
  return (
    <div className="modal-main-show">
      <div>
        <button className="modal-x" onClick={props.hideModal}>
          X
          </button>
      </div>
      <div>
        <span className="request-title">{modalObject.postingTitle}</span>
      </div>
      <div>
        <span className="total-amount">
          {/* Total cost for {props.requestDates.length} days: ${totalAmount} */}
        </span>
      </div>
      <div>
        <span>Requestor: {props.user}</span>
      </div>
      <div>
        <img className="request-image" src={props.image} alt='' />
      </div>
      {ownerButtons()}
    </div>
  )
}
