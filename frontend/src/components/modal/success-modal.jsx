import React from 'react';

const SuccessModal = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      
      <section className="success-modal-main">{children}</section>
    </div>
  );
};

export default SuccessModal;