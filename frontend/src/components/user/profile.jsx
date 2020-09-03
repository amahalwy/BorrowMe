import React from 'react';

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-info-box">
        <h1>Profile</h1>
        <div className="profile-picture-box">
        </div>
        <div className="profile-user-info">
          <h2>Fname</h2>
          <h2>Lname</h2>
          <h2>Email</h2>
          <h2>Address</h2>
          <h2>Change Password</h2>
        </div>
        <div className="profile-edit-button-container">
          <button className="profile-edit-button">Edit Profile</button>
        </div>
      </div>
      <div className="profile-main-box">
        <div className="profile-postings">
          <h1>Postings</h1>
          <p>All your postings here</p>
        </div>
        <div className="profile-rentals">
          <h1>Rentals</h1>
          <p>Current rentals and rental history here</p>
        </div>
      </div>
    </div>
  )
}

export default Profile;