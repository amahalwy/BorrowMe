import React from 'react';
import {useDispatch} from 'react-redux';
import {clickPosting} from '../../actions/posting_actions';

export default props => {
  const dispatch = useDispatch();

  const handleClick = () => {
    setTimeout(() => {
      dispatch(clickPosting(props.posting._id));
      props.showModal();
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
        <div className="item-info-bar">
          <div className='item-info-top'>
            <div className="post-title">
              <span>{props.posting.title}</span>
            </div>
            <div className="post-price">
              <span>Price: ${props.posting.price}/day</span>
            </div>
          </div>
          <div className='item-info-bottom'>
            <div className="post-tags">
              <span>Tags: {props.posting.tags}</span>
            </div>
          </div>
        </div>
      </div>
    </div>      
  );
}                    
