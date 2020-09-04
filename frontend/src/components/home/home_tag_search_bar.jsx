import React from 'react'

export default ({keyword, setKeyword}) => {
  return (
    <div >
      <input
        className="search-bar-tag"
        type="text"
        value={keyword}
        placeholder="Search by tag"
        onChange={(e) => setKeyword(e.currentTarget.value)}
      />
    </div>
  );
}
