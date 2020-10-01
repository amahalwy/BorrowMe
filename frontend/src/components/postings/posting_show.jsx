import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Calendar from '../calendar/calendar';
import { clearModal } from '../../actions/posting_actions'
import Map from '../map/map'
import Modal from '../../components/modal/modal';

export default (props) => {
  const currentUser = useSelector(state => state.session.user);
  const [owner, setOwner] = useState();
  const dispatch = useDispatch();

  const handleClick = () => {
    props.hideModal();
    dispatch(clearModal());
  };

  useEffect(() => {
    if (Object.keys(props.posting).length > 0) {
      fetchUser(props.posting.ownerId);
    }
  }, [])

  const fetchUser = (userId) => {
    return fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(data => setOwner(data))
  }

  if (!owner) return '';
  return (
    <div className="modal-main-show">
   
      <div className="modal-top-bar">
        <h1 className="modal-item-title">{props.posting.title}</h1>
        <button className="modal-x" onClick={handleClick}>
          X
        </button>
        <div className="modal-price-desc">
          <div>
            {owner.firstName}
          </div>
          <div className="modal-price">
            <span> Price: </span> ${props.posting.price}
          </div>
            <div className="modal-description">{props.posting.description}</div>
        </div>
      </div>

      <div className="modal-item-info">
        <div className="img-container">
          <img className="modal-img" src={props.posting.image} alt="" />
        </div>
        <div className="posting-show-calendar">
          <Calendar posting={props.posting} hideModal={props.hideModal}/>
        </div>
      </div>
    </div>
  );
}