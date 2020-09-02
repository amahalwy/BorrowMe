import React from 'react'

export default ({keyword, setKeyword}) => {
  return (
    <div>
        <input 
          className="search-bar"
          type="text"
          value={keyword}
          placeholder="Search by keyword"
          onChange={e => setKeyword(e.currentTarget.value)}
        />
    </div>
  )
}