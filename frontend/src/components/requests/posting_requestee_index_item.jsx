import React from "react";
import {useDispatch} from 'react-redux';
import { clickRequest} from '../../actions/request_actions';

export default (props) => {
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
    </div>
  );
};
