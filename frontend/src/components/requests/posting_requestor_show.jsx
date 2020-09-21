import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import Map from "../map/map";

export default (props) => {
  // const currentUser = useSelector((state) => state.session.user);

  
  const totalAmount = props.amount * props.requestDates.length;

  // const [openModal, setModal] = useState(false);

  // const showModal = (e) => {
  //   e.preventDefault();
  //   setModal(true);
  // };

  // const hideModal = () => {
  //   setModal(false);
  // };

  return (
    <div className="modal-main-show">
      <button className="modal-x" onClick={props.hideModal}>
        X
      </button>
      <div>
        <span className="request-title">{props.title}</span>
      </div>
      <div>
        <span className="total-amount">
          Total cost for {props.requestDates.length} days: ${totalAmount}
        </span>
      </div>
      <div>
        <span>Requestor: {props.user}</span>
      </div>
      <div>
        <img className="request-image" src={props.image} />
      </div>
      <div></div>
      <div className="request-buttons">
        <span>
          <button className="accept-request">Accept</button>
        </span>
        <span>
          <button className="reject-request">Reject</button>
        </span>
      </div>
    </div>
  );
};
