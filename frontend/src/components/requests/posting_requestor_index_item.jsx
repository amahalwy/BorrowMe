import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clickRequest, clearModal } from '../../actions/request_actions';

export default props => {

  const dispatch = useDispatch();

  const handle = () => {
    dispatch(clickRequest(props.request._id));
    setTimeout(()=>{
      props.showModal();
    },1)
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
      
    </div>
  );

}                    
