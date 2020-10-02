import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { createBooking, clearBookings, fetchOwnerBookings, fetchRenterBookings } from '../../actions/booking_actions';
import { fetchRequestorRequests, fetchReceiverRequests, clearRequests, deleteRequest, clearModal } from '../../actions/request_actions';

export default props => {
  const modalObject = useSelector(state => state.entities.modal);
  const [posting, setPosting] = useState();
  const dispatch = useDispatch();

  const acceptRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ownerId", props.currentUser._id)
    formData.append("requestorId", modalObject.requestorId)
    formData.append("requestorName", modalObject.requestorName)
    formData.append("postingId", modalObject.postingId)
    formData.append("requestDates", modalObject.requestDates)
    formData.append("price", modalObject.amount)
    formData.append("bookingImage", modalObject.postingImage)

    dispatch(createBooking(formData));

    setTimeout(() => {
      dispatch(clearBookings());
      dispatch(clearRequests());
      dispatch(fetchOwnerBookings(props.currentUser._id));
      dispatch(fetchRenterBookings(props.currentUser._id));
      dispatch(deleteRequest(modalObject._id));
      dispatch(clearModal());
      props.hideModal();
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
      dispatch(clearModal());
      props.hideModal();
    }, 1)
  }

  useEffect(() => {
    if (modalObject.ownerId || modalObject.receiverId) { //Check to see if modalObject === booking || modalObject === request
      fetchPosting(modalObject.postingId);
    }
    
    return () => {
      setPosting();
    }
  }, [modalObject]);

  const handleClose = () => {
    dispatch(clearModal());
    setTimeout(() => {
      props.hideModal();
    }, 1)
  }

  const fetchPosting = (postingId) => {
    return fetch(`/api/postings/${postingId}`)
    .then(response => response.json())
    .then(data => setPosting(data))
  }

  const generateContent = () => {
    if (!posting) {
      return '';
    } else if (modalObject.receiverId && modalObject.receiverId === props.currentUser._id) { // This object is a REQUEST and you are owner (received request)
      return (
          <div>
            <div>
              <button className="modal-x" onClick={handleClose}>
                X
            </button>
            </div>
            <div>
              <span className="request-title">{modalObject.postingTitle}</span>
            </div>
            <div>
              <span className="total-amount">
                {/* Total cost for {props.request.requestDates.length} days: ${totalAmount} */}
              </span>
            </div>
            <div>
              <span>Requestor: {modalObject.requestorName}</span>
            </div>

            <div className='stuff'>
              <img className="request-image" src={modalObject.postingImage} alt='' />
            </div>
            <div className="request-buttons">
              <span>
                <button className="accept-request" onClick={acceptRequest}>Accept</button>
              </span>
              <span>
                <button className="reject-request" onClick={declineRequest}>Reject</button>
              </span>
            </div>
          </div>
      )
    } else if (modalObject.receiverId && modalObject.receiverId !== props.currentUser._id) { // This object is a REQUEST and you are NOT owner (your request)
      return (
        <div>
          <div>
            <button className="modal-x" onClick={handleClose}>
              X
            </button>
          </div>
          <div>
            <span className="request-title">{modalObject.postingTitle}</span>
          </div>
          <div>
            <span className="total-amount">
              {/* Total cost for {props.request.requestDates.length} days: ${totalAmount} */}
            </span>
          </div>
          <div>
            <span>Requestor: {modalObject.requestorName}</span>
          </div>
          <div className='stuff'>
            <img className="request-image" src={modalObject.postingImage} alt='' />
          </div>
        </div>
      )
    } else if (modalObject.ownerId && modalObject.ownerId === props.currentUser._id) { // This object is a BOOKING and you are owner (upcoming bookings)
      return (
        <div>
          <div>
            <button className="modal-x" onClick={handleClose}>
              X
            </button>
          </div>
          <div>
            <span className="request-title">{posting.title}</span>
          </div>
          <div>
            <span className="total-amount">
              {/* Total cost for {props.request.requestDates.length} days: ${totalAmount} */}
            </span>
          </div>
          <div>
            <span>Requestor: </span>
          </div>
          <div>
            <img className="request-image" src={modalObject.bookingImage} alt='' />
          </div>
        </div>
      )
    } else if (modalObject.ownerId && modalObject.ownerId !== props.currentUser._id) { // This object is a BOOKING and you are NOT owner (your upcoming bookings)
      return (
        <div>
          <div>
            <button className="modal-x" onClick={handleClose}>
              X
            </button>
          </div>
          <div>
            <span className="request-title">{posting.title}</span>
          </div>
          <div>
            <span className="total-amount">
              {/* Total cost for {props.request.requestDates.length} days: ${totalAmount} */}
            </span>
          </div>
          <div>
            <span>Requestor: </span>
          </div>
          <div>
            <img className="request-image" src={modalObject.bookingImage} alt='' />
          </div>
        </div>
      )
    }
  }

  // const totalAmount = props.amount * props.request.requestDates.length;

  return (
    <div className="modal-main-show">
      {generateContent()}
    </div>
  )
}
