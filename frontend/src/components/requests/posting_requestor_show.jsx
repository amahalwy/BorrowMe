import React from "react";
import { useSelector } from "react-redux";

export default (props) => {
  const currentUser = useSelector((state) => state.session.user);
  const totalAmount = props.amount * props.requestDates.length;


  return (
    <div className="modal-main-show">
      {/* <div className="modal-top-bar">
        <h1 className="modal-item-title">{props.posting.title}</h1>
        <button className="modal-x" onClick={props.hideModal}>
          X
        </button>
        <div className="modal-price-desc">
          <div className="modal-price">
            <span> Price: </span> ${props.posting.price}
          </div>
          <br />
          <div className="modal-description">{props.posting.description}</div>
        </div>
      </div>

      <div className="modal-item-info">
        <div className="img-container">
          <img className="modal-img" src={props.posting.image} alt="" />
        </div>
        <div>
          <Map posting={props.posting} currentUser={currentUser} />
        </div>
      </div> */}

      {/* Title, amount * dates.length, image */}
      <div className="request-image">
        {/* <img src={props.image} alt=""/> */}
      </div>
      <div>
        <div>
          <span>{props.title}</span>
        </div>
        <div>
          <span>{props.requestDates}</span>
          <span>{totalAmount}</span>
        </div>
      </div>
    </div>
  );
};
