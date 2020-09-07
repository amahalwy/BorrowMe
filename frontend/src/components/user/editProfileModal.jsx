import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import { useSelector, useDispatch } from "react-redux";
import { updateUserPhoto } from '../../actions/user_actions';
import axios from 'axios';
import FormData from 'form-data';

const EditProfileModal = (props) => {
  const currentUser = useSelector(state => state.session.user)
  const activeUser = useSelector(state => state.entities.users.user);

  const [firstName, updateFirstName] = useState(currentUser.firstName);
  const [lastName, updateLastName] = useState(currentUser.lastName);
  const [email, updateEmail] = useState(currentUser.email);
  const [address, updateAddress] = useState(currentUser.address);
  const [city, updateCity] = useState(currentUser.city);
  const [state, updateState] = useState(currentUser.state);
  const [zipCode, updateZipCode] = useState(currentUser.zipCode);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zipCode", zipCode);
    formData.append("file", profilePhoto);
    
    
    // axios.post("/api/postings", formData)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
    
    dispatch(updateUserPhoto(formData));
    props.hideModal();
  };

  const onDrop = (picture) => {
    setProfilePhoto(picture[0]);
    setTimeout(() => {
      handleSubmit()
    }, 3000)
  }

  const renderErrors = () => {
    return (
      <ul>
        {Object.keys(errors).map((error, i) => (
          <li key={`error-${i}`}>{errors[error]}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="edit-profile-container">
      <form className="profile-edit-form">
        <h1>Edit Profile Info</h1>
        <br />
        <div className="edit-profile-picture-box">
          <img
            className="edit-profile-photo-img"
            src={activeUser.profilePhoto}
            alt="Profile Image"
          />
        </div>
        <br />
        <button className="edit-profile-modal-x" onClick={props.hideModal}>
          X
        </button>
        <ImageUploader
          withIcon={true}
          buttonText="Choose Image"
          onChange={onDrop}
          className="edit-profile-img-uploader"
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        />
        <br />
        <div className="edit-profile-first">
          <input
            type="text"
            value={firstName}
            onChange={(e) => updateFirstName(e.currentTarget.value)}
            placeholder={currentUser.firstName}
          />
          <br />
          <input
            type="text"
            value={lastName}
            onChange={(e) => updateLastName(e.currentTarget.value)}
            placeholder={currentUser.lastName}
          />
     
        <br />
        <input
          type="text"
          value={address}
          onChange={(e) => updateAddress(e.currentTarget.value)}
          placeholder={currentUser.address}
        />
   </div>
        <br />
        <div className="profile-posting-second">
          <input
            type="text"
            className="profile-city"
            value={city}
            onChange={(e) => updateCity(e.currentTarget.value)}
            placeholder={currentUser.city}
          />
          <br />
          <input
            type="text"
            value={state}
            className="profile-state"
            onChange={(e) => updateState(e.currentTarget.value)}
            placeholder={currentUser.state}
          />
          <br />

          <input
            type="text"
            value={zipCode}
            className="profile-zipCode"
            onChange={(e) => updateZipCode(e.currentTarget.value)}
            placeholder={activeUser.zipCode}
          />
        </div>
        <br />
        <div className="create-posting-img"></div>
        <br />
        <input type="submit" value="Save Changes" onClick={handleSubmit} />
        {renderErrors()}
      </form>
    </div>
  );
}

export default EditProfileModal;