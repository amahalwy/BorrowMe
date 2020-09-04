import React from 'react';
import Calendar from '../calendar/calendar';

export default (props) => {

  return (
    <div>
      <div>
        <div className="modal-top-bar">
          <h1 className="modal-item-title">{props.posting.title}</h1>
          <button className="modal-x" onClick={props.hideModal}>
            X
          </button>
        </div>
        <div className="modal-img">
          <div>
            <img src={props.posting.image} alt="" />
          </div>
        </div>
        <div className="modal-item-info">
          <div className="modal-description">{props.posting.description}</div>
          <div className="modal-price">Price: {props.posting.price}</div>
          <div className="modal-calendar">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}