import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, fetchUser } from '../../actions/user_actions';
import FormData from 'form-data';

const EditProfileModal = (props) => {
  const currentUser = useSelector(state => state.entities.users.user);

  const getPhoto = () => {
    if (currentUser.profilePhoto) {
      return currentUser.profilePhoto;
    } else {
      return null;
    }
  }

  const [firstName, updateFirstName] = useState(currentUser.firstName);
  const [lastName, updateLastName] = useState(currentUser.lastName);
  const [address, updateAddress] = useState(currentUser.address);
  const [city, updateCity] = useState(currentUser.city);
  const [state, updateState] = useState(currentUser.state);
  const [zipCode, updateZipCode] = useState(currentUser.zipCode);
  const [profilePhoto, setProfilePhoto] = useState(getPhoto());
  
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", currentUser.email);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zipCode", zipCode);
    formData.append("file", profilePhoto);

    dispatch(updateUser(currentUser.id ,formData));
    setTimeout(() => {
      dispatch(fetchUser(currentUser._id));
    }, 1000)
    props.hideModal();
  };

  const onDrop = (picture) => {
    setProfilePhoto(picture[picture.length - 1]);
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
            src={currentUser.profilePhoto}
            alt=""
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
            placeholder={currentUser.zipCode}
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