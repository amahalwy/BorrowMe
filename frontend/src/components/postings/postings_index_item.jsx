import React from 'react'

export default props => {

  // debugger
  return (
    <div className="post-index-item">
      <div>{/* Header */}
        <div><span></span></div>
      </div>
      <div>{/* Body */}
        <div>{/*Left Body*/}
          <div className="post-index-item-image-container">
            {/* <img src="" alt=""/> */}
          </div>
        </div>
        <div>{/* Right body */}
          <div>{/*Text*/}
            <div className="post-title"><span>{props.posting.title}</span></div>
            <div className="home-no-show"><span>Zipcode</span></div>
            <div className="post-price"><span>Price:</span></div>
          </div>
          <div className="home-no-show">Calendar
            <div>
              {/* Calendar */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
