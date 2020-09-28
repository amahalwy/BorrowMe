import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 


export default props => {

if (!props.postings) return "";

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="profile-postings-image-list">
      <Slider className="postings-index-image-box" {...settings}>
        {props.postings.map((posting, i) => {
          return (
            <div key={i}>
              <img
                className="postings-index-image"
                src={posting.image}
                alt=""
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
