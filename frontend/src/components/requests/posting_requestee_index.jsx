import React from "react";
import PostingRequesteeIndexItem from "./posting_requestee_index_item";


export default (props) => {

  return (
    <div className="profile-postings-image-list">
      {props.requests.map((request) => {
        return (
          <PostingRequesteeIndexItem key={request._id} request={request} showModal={props.showModal}/>
        );
      })}
    </div>
  );
};