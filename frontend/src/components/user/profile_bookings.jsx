import React from 'react'

const ProfileBookings = props => {


  return (
    <div className="profile-postings-image-list">
      {
        props.postings.map(posting => {
          if (posting)
          return (
            <div className="postings-index-image-box">
              <img className="postings-index-image" src={posting.image} alt="" />
            </div>
          )
        })
      }
    </div>
  )
}

export default ProfileBookings;
