import React from 'react'

export default props => {

  // debugger
  return (
    <div>
      <div>Header
        <div><span></span></div>
      </div>
      <div>Body
        <div>Left body
          <div>
            {/* <img src="" alt=""/> */}
          </div>
        </div>
        <div>Right body
          <div>Text
            <div><span>{props.posting.title}</span></div>
            <div><span>Zipcode</span></div>
            <div><span>Price</span></div>
          </div>
          <div>Calendar
            <div>
              {/* Calendar */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
