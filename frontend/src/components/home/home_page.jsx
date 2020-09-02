import React, { useState, useEffect } from 'react';
import SearchBar from './home_search_bar';
import TagSearchBar from './home_tag_search_bar';
import PostingsIndex from '../postings/postings_index';

const SearchPage = (props) => {
  const [input, setInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [filterList, setFilterList] = useState();
  const [postingList, setPostingList] = useState();

  // This function is used to update the filter list; when typing, the input
  // will be used to filter out the postings that have the input INCLUDED in
  // their name
  const updateInput = input => {
    const filtered = postingList.filter((posting) => {
      return posting.title.toLowerCase().includes(input.toLowerCase());
    });

    setInput(input);
    setFilterList(filtered);
  };

  // Function used to filter by tags instead
  const updateTagInput = input => {
    const filtered = postingList.filter(posting => {
      return posting.tags.includes(input.toLowerCase())
    })

    setTagInput(input);
    setFilterList(filtered);
  };


  // Standalone fetch for data (think of an axios request but not api_util)
  // Using this to set the data immediately; can change this to be api_util later
  const fetchData = () => {
    return fetch("/api/postings")
      .then((response) => response.json())
      .then((data) => {
        setFilterList(data);
        setPostingList(data);
      });
  };

  // useEffect hook that mounts and invokes the above function
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home-container">
      <div className="home-filter">
        <h2>Filter</h2>
        <TagSearchBar tagInput={tagInput} setKeyword={updateTagInput} />
      </div>
      <div className="home-index">
        <SearchBar input={input} setKeyword={updateInput} />
        <div>
          <PostingsIndex filterList={filterList} />
        </div>
      </div>
    </div>
  );
}

export default SearchPage