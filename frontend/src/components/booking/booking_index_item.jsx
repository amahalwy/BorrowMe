import React from 'react'

export default props => {
  if (!props.booking.requestDates) return '';
  return (
    <div className="bookings-index-image-box">
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

