import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Calendar from '../calendar/calendar';
import Map from '../map/map'
import { clearModal } from '../../actions/posting_actions'
import Modal from '../../components/modal/modal';

export default (props) => {
  const currentUser = useSelector(state => state.session.user);
  const [openModal, setModal] = useState(false)
  const dispatch = useDispatch();

  const showModal = async (e) => {
    e.preventDefault();
    await setModal(true);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1)
  };

  const hideModal = () => {
    setModal(false);
  };

  const handleClick = () => {
    setTimeout(() => {
      dispatch(clearModal());
      props.hideModal();
    }, 1);
  };

  return (
    <div className="modal-main-show">
   
      <div className="modal-top-bar">
        <h1 className="modal-item-title">{props.posting.title}</h1>
        <button className="modal-x" onClick={handleClick}>
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
          <Calendar posting={props.posting} hideModal={props.hideModal}/>
        </div>
      </div>
    </div>
  );
}