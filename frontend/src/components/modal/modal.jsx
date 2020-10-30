import React from "react";

const Modal = ({ handleClose, show, children, modalType }) => {
  const showHideClassName = show
    ? "modal display-block"
    : "modal display-none";

  const getClass = () => {
    return `modal-main-${modalType}`
  }

  return (
    <div className={showHideClassName}>
      <section className={getClass()}>{children}</section>
    </div>
  );
};

export default Modal;
