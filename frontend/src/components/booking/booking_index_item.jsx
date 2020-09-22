import React from 'react'

export default props => {
  if (!props.booking.requestDates) return '';
  debugger
  return (
    <div className="bookings-index-image-box">
      <img className="bookings-index-image" src={props.booking.bookingImage} alt="" />
      <div>
        <div>
          Renter: {props.booking.requestorName}
        </div>
        <div>
          Start Date: {props.booking.requestDates[0]}
        </div>
      </div>
    </div>
  )
}
