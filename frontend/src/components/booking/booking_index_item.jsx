import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {clickPosting, clearModal} from '../../actions/posting_actions';

export default props => {

  // const posting = useSelector(state => state.entities.modal)
  // const dispatch = useDispatch();

  // const handleClick = () => {
  //   dispatch(clickPosting(props.booking._id));
  //   setTimeout(()=>{
  //     props.showModal();
  //   },1)
  // }

  if (!props.booking.requestDates) return '';

  // debugger;
  return (
    // <div onClick={handleClick}>
    <div className="Upcoming-item">
      <img className="bookings-index-image" src={props.booking.bookingImage} alt="" />
      <div>
        <div>
          Renter: {props.booking.requestorName}
        </div>
        <div>
          Start Date: {props.booking.requestDates[0].split(" ").splice(0,4).join(" ")}
        </div>
      </div>
    </div>
  )
}

