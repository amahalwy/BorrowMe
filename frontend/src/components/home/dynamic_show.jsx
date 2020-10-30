import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Calendar from '../calendar/calendar';
import Map from '../map/map';

export default props => {
  const modalObject = useSelector(state => state.entities.modal);
  const mapObject = useSelector(state => state.entities.map);
  const [owner, setOwner] = useState();

  const handleClick = () => {
    props.hideModal();
  };
  
  useEffect(() => {
    if (Object.keys(modalObject).length > 0 && !modalObject.res) {
      fetchUser(modalObject.ownerId);
    }

    if (mapObject.res === 'MAP') {
      return;
    }

    setOwner();

  }, [modalObject, mapObject])

  const fetchUser = (userId) => {
    return fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(data => setOwner(data))
  }

  if (!owner) return ''

  if (mapObject.res === "MAP") {
    return (
      <div className='MAPSTUFFF'>
        <Map hideModal={props.hideModal} />
      </div>
    )
  } else {
    return (
      <div className="modal-main-show-item">
        <div className="modal-top-bar">
          <div className="modal-item-title">
            <p>{modalObject.title}</p>
          </div>
                    
          <div className="modal-price-desc">
            <div className="modal-description">
              <p>
                {modalObject.description}
              </p>
            </div>
            <div className="modal-price">
              <span className="postings-show-name-span"> <span className="postings-show-price-span">Posted by:</span> {owner.firstName} </span>
              <span className="postings-show-price-span"> Price: </span> ${modalObject.price}
            </div>
          </div>
          <div className='modal-close-button'>
          <svg 
            id="Layer_1" 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 12.32 10.24"
            onClick={handleClick}
            className="modal-x"
          >
            <polygon 
              points="12.32 0.2 12.15 0 6.16 4.95 0.17 0 0 0.2 5.95 5.12 0 10.04 0.17 10.24 6.16 5.29 12.15 10.24 12.32 10.04 6.37 5.12 12.32 0.2"/>
          </svg>
          </div>
        </div>
  
        <div className="modal-item-info">
          <div className="img-container">
            <img className="modal-img" src={modalObject.image} alt="" />
          </div>
          <div className="posting-show-calendar">
            <Calendar posting={modalObject} hideModal={props.hideModal} />
          </div>
        </div>
      </div>
    )
  }
}