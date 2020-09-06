import React from 'react'

export default props => {

  if (!props.postings) return "";

  return (
    <div className="profile-postings-image-list">
        {
          props.postings.map(posting => {
            return (
              <div className="postings-index-image-box">
                <img className="postings-index-image" src={posting.image} alt=""/>
              </div>
            )
          })
        }
    </div>
  )
}
