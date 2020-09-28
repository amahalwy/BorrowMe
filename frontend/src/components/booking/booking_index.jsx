import React from 'react'
import BookingIndexItem from './booking_index_item';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 

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
      <Slider
        className="bookings-slider postings-index-image-box"
        {...settings}
      >
        {props.bookings.map((booking) => {
          return <BookingIndexItem booking={booking} key={booking._id} />;
        })}
      </Slider>
    </div>
  );
}
