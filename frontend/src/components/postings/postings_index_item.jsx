import React, {useState} from 'react';
import Modal from '../modal/modal';
import PostingShow from './posting_show';

export default props => {

  const [openModal, setModal] = useState(false)

  // this.state = {
  //   openModal: false
  // }

  // setModal("hello")

  // const update = () => {
  //   this.setState({openModal: 'hello'})
  // }

  const showModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  return (
    <div className="post-index-item">
      <div>
        {/* Header */}
        {/* <div>
          <span></span>
        </div> */}
      </div>
      <div>
        {/* Body */}
        <div>
          {/*Left Body*/}
          <div onClick={showModal} className="post-index-item-image-container">
            <div className="image-container">
              <img className="posting-image" src={props.posting.image} alt="" />
            </div>
          </div>
        </div>
        
        <div>
          {/* Right body */}
          <div className="Item-info-bar">
            {/*Text*/}
            <div className="post-title">
              <span>{props.posting.title}</span>
            </div>
            <div className="home-no-show">
              <span>Zipcode</span>
            </div>
            <div className="post-price">
              <span>Price: {props.posting.price}</span>
            </div>
          </div>
          <div className="home-no-show">
            Calendar
            <div>{/* Calendar */}</div>
          </div>
        </div>
      </div>
      <Modal show={openModal} handleClose={hideModal}>
        <PostingShow posting={props.posting} hideModal={hideModal} />
      </Modal>
    </div>
  );

}                    
