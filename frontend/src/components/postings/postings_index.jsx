import React, {useState} from 'react';
import PostIndexItem from './postings_index_item';
import Slider from 'react-slick';
// @import './styles/slick-theme.css';
// @import './styles/slick.css';
// @import './styles/slick-theme.scss';
// @import './styles/slick.scss';
import Modal from "../modal/modal";
import PostingShow from "./posting_show";

export default props => {
  
  if (!props.filterList) return '';

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    rows: 2
  };

return (
  <div className="home-items-index">
      <Slider {...settings}>
        {props.filterList.map((posting) => {
          return (
            <PostIndexItem
              key={posting._id}
              posting={posting}
              showModal={props.showModal}
              hideModal={props.hideModal}
            />
          );
        })}
      </Slider>
  </div>
);
}
