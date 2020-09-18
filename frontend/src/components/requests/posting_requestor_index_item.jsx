import React, { useState } from 'react';
import Modal from '../modal/modal';
import PostingRequestorShow from './posting_requestor_show';

export default props => {

  const [openModal, setModal] = useState(false)

  const showModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };


  return (
    <div className="postings-index-image-box" onClick={showModal}>
      <img
        className="postings-index-image"
        src={props.request.postingImage}
        alt=""
      />
      <span></span>
      <Modal show={openModal} handleClose={hideModal}>
        <PostingRequestorShow
          title={props.request.postingTitle}
          image={props.request.postingImage}
          amount={props.request.amount}
          requestDates={props.request.requestDates}
          hideModal={hideModal}
        />
      </Modal>
    </div>
  );

}                    