import React, { useState } from 'react';
import Modal from '../modal/request_modal';
import PostingRequestorShow from './posting_requestor_show';

export default props => {

  const [openModal, setModal] = useState(false)
  // const [hideModal, setModal] = useState(true)

  const showModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const hideModal2 = (e) => {
    e.preventDefault();
    setModal(false);
  };

  return (
    <div className="postings-index-image-box" onClick={showModal}>
      <img
        className="postings-index-image"
        src={props.request.postingImage}
        alt=""
      />
      <span> </span>
      <Modal show={openModal} handleClose={hideModal2}>
        <PostingRequestorShow
          title={props.request.postingTitle}
          image={props.request.postingImage}
          amount={props.request.amount}
          requestDates={props.request.requestDates}
          hideModal={hideModal2}
        />
      </Modal>
    </div>
  );

}                    
