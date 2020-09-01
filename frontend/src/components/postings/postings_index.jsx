import React, { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { fetchPostings } from '../../actions/posting_actions';
import PostingIndexItem from './postings_index_item';

export default (props) => {
  const postings = useSelector(state => Object.values(state.entities.postings || {}))
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(fetchPostings());

    // Think about unmounting?

  }, [postings])

  return (
    <div>
      <ul>
        {
          postings.map(posting => {
            return (
              <PostingIndexItem 
                key={posting.id}
                posting={posting}
              />
            )
          })
        }
      </ul>
    </div>
  )
  
}
