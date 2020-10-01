import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Modal from '../modal/modal';
import PostingShow from './posting_show';
import {clickPosting, clearModal} from '../../actions/posting_actions';

export default props => {
  const [openModal, setModal] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setModal(true) 
  }

  const hideModal = () => {
    setModal(false) 
  }

  const handleClick = () => {
    setTimeout(() => {
      dispatch(clickPosting(props.posting._id));
      showModal();
    }, 1)
  }

  return (
    <div>
      <div className="posting-index-item">      
        <div className="entire-image"  >        
            <div onClick={handleClick}
                className="post-index-item-image-container"
                >
              <div className="image-container">
                <img className="posting-image" src={props.posting.image} alt="" />
              </div>
            </div>
        </div>
          <div className="Item-info-bar">
            <div className="post-title">
              <span>{props.posting.title}</span>
            </div>
            <div className="home-no-show">
              <span>Zipcode</span>
            </div>
            <div className="post-price">
              <span>Price: ${props.posting.price}/day</span>
            </div>
            <div className="post-tags">
              <span>Tags: {props.posting.tags}</span>
            </div>
          </div>
          <div className="home-no-show">Calendar</div>
        </div>
      
        <Modal show={openModal} handleClose={hideModal}>
          <PostingShow posting={props.posting} hideModal={hideModal} />
        </Modal>
      </div>      
  );
}                    
