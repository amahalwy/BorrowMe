import React from 'react'
import {useDispatch} from 'react-redux';
import {clickBooking} from '../../actions/booking_actions';

export default props => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clickBooking(props.booking._id));
    setTimeout(()=>{
      props.showModal();
    }, 1)
  }

  return (
    <div className="Upcoming-item" onClick={handleClick}>
      <img 
        className="bookings-index-image" 
        src={props.booking.bookingImage} 
        alt="" 
      />
    </div>
  )
}

