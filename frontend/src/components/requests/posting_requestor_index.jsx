import React from 'react';



export default props => {


  return (
    <div className="profile-postings-image-list">
      {
        props.requests.map(request => {
          
            return (
              <div className="postings-index-image-box">
                <img className="postings-index-image" src='' alt="" />
              </div>
            )
        })
      }
    </div>
  )

}