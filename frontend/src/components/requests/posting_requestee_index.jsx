import React from "react";
import PostingRequesteeIndexItem from "./posting_requestee_index_item";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 

export default (props) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="profile-postings-image-list">
      <Slider className="postings-index-image-box" {...settings}>
        {props.requests.map((request) => {
          return (
            <PostingRequesteeIndexItem key={request._id} request={request} />
          );
        })}
      </Slider>
    </div>
  );
};