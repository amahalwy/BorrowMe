import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';

export default props => {
  const modalObject = useSelector((state) => state.entities.modal); 

  // const dispatch = useDispatch();

  const ownerButtons = () => {
    if (!modalObject) {
      return ''
    } else if (modalObject.receiverId === props.currentUser._id) {
      return (
        <div className="request-buttons">
          <span>
            <button className="accept-request">Accept</button>
          </span>
          <span>
            <button className="reject-request">Reject</button>
          </span>
        </div>
      )
    }
    console.log(modalObject);
  }

  useEffect(() => {
    console.log(modalObject);
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
        <span className="request-title">{props.title}</span>
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
