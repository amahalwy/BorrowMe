import React from 'react';
import PostIndexItem from './postings_index_item';

export default props => {

  if (!props.filterList) return '';

  return (
    <div className="home-items-index">
      <ul className="home-index-list">
      { 
          props.filterList.map(posting => {
          return (
            <PostIndexItem 
              key={posting._id}
              posting={posting}
            />
          )
        }) 
      }   
      </ul>
    </div>
  )
}
