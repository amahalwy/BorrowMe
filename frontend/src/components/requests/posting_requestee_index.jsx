import React from "react";
import PostingRequesteeIndexItem from "./posting_requestee_index_item";


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
        {props.requests.map((request) => {
          return (
            <PostingRequesteeIndexItem key={request._id} request={request} />
          );
        })}
    </div>
  );
};