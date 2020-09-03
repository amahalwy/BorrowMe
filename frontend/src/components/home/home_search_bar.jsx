import React from 'react'

export default ({keyword, setKeyword}) => {
  return (
    <div>
      <div className="home-search-icon-container">
        <img className="home-search-icon" src="https://www.iconsdb.com/icons/preview/white/search-15-xxl.png" alt="search-icon"/>
        <input 
          className="search-bar"
          type="text"
          value={keyword}
          placeholder="Search by keyword"
          onChange={e => setKeyword(e.currentTarget.value)}
        />
        </div>
    </div>
  )
}
