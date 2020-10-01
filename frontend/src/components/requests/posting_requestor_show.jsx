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
        <div className="request-title">
          {props.title}
        </div>
        <div className="requestor-cost">
            Total cost for {props.requestDates.length} days: ${totalAmount}
        </div>
        <div className="requestor">
          Requestor: {props.user}
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
