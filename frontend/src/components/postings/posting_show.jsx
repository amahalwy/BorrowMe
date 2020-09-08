import React from 'react';
// import {useSelector} from 'react-redux';
import Calendar from '../calendar/calendar';
import Map from '../map/map'

export default (props) => {
  // const currentUser = useSelector(state => state.session.user)

  return (
    <div className="modal-main-show">
      <div className="modal-top-bar">
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
        <div className="modal-calendar">
          <Calendar posting={props.posting}/>
        </div>
        {/* <div><Map posting={props.posting} currentUser={currentUser}/></div> */}
      </div>
    </div>
  );
}