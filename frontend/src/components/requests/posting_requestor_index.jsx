import React from 'react';
import PostingRequestorIndexItem from './posting_requestor_index_item'; 

export default props => {
  return (
    <div className="profile-postings-image-list">
      {props.requests.map(request => {
          return (
            <PostingRequestorIndexItem
              key={request._id}
              request={request}
            />
          );
        })
      }
    </div>
  )
}