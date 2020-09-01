import React, { useState, useEffect } from 'react';
import SearchBar from './home_search_bar';
import PostingsIndex from '../postings/postings_index';

const SearchPage = (props) => {
  const [input, setInput] = useState('');
  const [filterList, setFilterList] = useState();
  const [postingList, setPostingList] = useState();

  // This function is used to update the filter list; when typing, the input
  // will be used to filter out the postings that have the input INCLUDED in 
  // their name
  const updateInput = input => {
    const filtered = postingList.filter(posting => {
      return posting.title.toLowerCase().includes(input.toLowerCase())
    })

    // const filtered = postingList.filter(posting => {
    //   return posting.tags.includes(input.toLowerCase())
    // })
    
    setInput(input);
    setFilterList(filtered);
  }

  // Standalone fetch for data (think of an axios request but not api_util)
  // Using this to set the data immediately; can change this to be api_util later
  const fetchData = () => {
    return fetch('/api/postings')
      .then(response => response.json())
      .then(data => {
        setFilterList(data)
        setPostingList(data)
      });
  }
  
  // useEffect hook that mounts and invokes the above function
  useEffect(() => {
    fetchData()
  } , []);


  // 
  return (
    <div>
      <h1>Posting List</h1>
      <SearchBar
        input={input}
        setKeyword={updateInput}
      />
      <PostingsIndex 
        filterList={filterList} 
      />
    </div>
  );
}

export default SearchPage