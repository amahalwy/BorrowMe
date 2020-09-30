import React from 'react'
import BookingIndexItem from './booking_index_item';

export default props => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="profile-bookings-slider">
        {props.bookings.map((booking) => {
          return <BookingIndexItem booking={booking} key={booking._id} />;
        })}
    </div>
  );
}
