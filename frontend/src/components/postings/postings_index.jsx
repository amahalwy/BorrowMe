import React, {useState} from 'react';
import PostIndexItem from './postings_index_item';
import Modal from "../modal/modal";
import PostingShow from "./posting_show";

export default props => {
  
  if (!props.filterList) return '';


return (
  <div className="home-items-index">
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
  </div>
);
}
