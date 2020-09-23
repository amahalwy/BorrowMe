import React from 'react'
import BookingIndexItem from './booking_index_item';

export default props => {

  return (
    <div className="profile-postings-image-list">
      {
        props.bookings.map(booking => {
          return (
            <BookingIndexItem 
              booking={booking} 
              key={booking._id}
            />
          )
        })
      }
    </div>
  )

}
