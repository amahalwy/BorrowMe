import React from 'react'
import HomeTagSearchBar from './home_tag_search_bar';


export default ({keyword, setKeyword}) => {
  return (
    <div className="search-container">
        <input 
          className="search-bar"
          type="text"
          value={keyword}
          placeholder="Search by keyword"
          onChange={e => setKeyword(e.currentTarget.value)}
        />
        <div className="tag-container"><HomeTagSearchBar/></div>
    </div>
  )
}
