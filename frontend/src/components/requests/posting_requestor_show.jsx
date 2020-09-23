import React from "react";

export default (props) => {

  if (!props.requestDates || props.requestDates === undefined) {
    return ''
  } else {
    
  const totalAmount = props.amount * props.requestDates.length;
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
            Total cost for {props.requestDates.length} days: ${totalAmount}
          </span>
        </div>
        <div>
          <span>Requestor: {props.user}</span>
        </div>
        <div>
          <img className="request-image" src={props.image} alt=''/>
        </div>
        <div></div>
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
  }
};
