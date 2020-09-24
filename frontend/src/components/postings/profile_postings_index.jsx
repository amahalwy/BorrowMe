import React from 'react'
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

export default props => {

if (!props.postings) return "";

  return (
    <div className="profile-postings-image-list">
        {
          props.postings.map((posting, i) => {
            return (
              <div key={i} className="postings-index-image-box">
                <img className="postings-index-image" src={posting.image} alt=""/>
              </div>
            )
          })
        }
    </div>
  )
}
