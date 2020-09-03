import React from 'react'

export default ({keyword, setKeyword}) => {
  return (
    <div>
      <div className="home-search-icon-container">
        <input 
          className="search-bar"
          type="text"
          value={keyword}
          placeholder="Search by keyword"
          onChange={e => setKeyword(e.currentTarget.value)}
        />
          <img className="home-search-icon" src="https://image.flaticon.com/icons/svg/622/622669.svg" alt="search-icon"/>
        </div>
    </div>
  )
}
