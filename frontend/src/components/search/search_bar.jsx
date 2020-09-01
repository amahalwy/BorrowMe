import React from 'react'

export default ({keyword, setKeyword}) => {

  return (
    <div>
      {/* <label> */}
        <input 
          type="text"
          value={keyword}
          placeholder="Search site for..."
          onChange={(e) => setKeyword(e.currentTarget.value)}
        />
      {/* </label> */}
    </div>
  )

}
