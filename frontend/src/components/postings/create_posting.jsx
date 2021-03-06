import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import { useSelector, useDispatch } from "react-redux";
import {createPosting, clearErrors} from '../../actions/posting_actions';
import FormData from 'form-data';

export default (props) => {
  const currentUser = useSelector(state => state.session.user);
  const errors = useSelector((state) => state.errors.postings);
  
  const [title, updateTitle] = useState("");
  const [price, updatePrice] = useState("");
  const [description, updateDescription] = useState("");
  const [address, updateAddress] = useState("");
  const [city, updateCity] = useState("");
  const [state, updateState] = useState("");
  const [zipCode, updateZipCode] = useState("");
  const [tags, updateTags] = useState("");
  const [imageFile, setFile] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("tags", tags);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zipCode", zipCode);
    formData.append("ownerId", currentUser.id);
    formData.append("file", imageFile);
  
    dispatch(createPosting(formData));
    // props.hideModal();
  };

  const onDrop = (picture) => {
    setFile(picture[0]);
  }

  // const removeUploaderErrors = () => {
  //   const errorsDiv = document.querySelector(".errorMessage");
  //   errorsDiv.innerHTML = '';
  // }

  const renderErrors = () => {
    if (Object.keys(errors).length > 0) {
      return (
        <div >
          <div id="create-posting-errors-h2">Could not create posting, see the below errors:</div>
          <ul>
            {Object.keys(errors).map((error, i) => (
              <li className="create-posting-errors" key={`error-${i}`}>{errors[error]}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="create-posting-container">
      <form className="posting-form">
        <div className="fields">
          <h1>Posting Form</h1>
          <br />
          <button className="posting-modal-x" onClick={
              () => {
                dispatch(clearErrors());
                // removeUploaderErrors();
                props.hideModal();
              }
            }>
            X
          </button>
          <br />
          {/* <div className="posting-first"> */}
            <input
              type="text"
              value={title}
              onChange={(e) => updateTitle(e.currentTarget.value)}
              placeholder="Title"
            />
            <br />
            <input
              type="text"
              value={price}
              onChange={(e) => updatePrice(e.currentTarget.value)}
              placeholder="Price"
            />
          {/* </div> */}
          <br />
          <input
            type="text"
            value={address}
            onChange={(e) => updateAddress(e.currentTarget.value)}
            placeholder="Address"
          />
          <br />
          {/* <div className="posting-second"> */}
            <input
              type="text"
              value={city}
              onChange={(e) => updateCity(e.currentTarget.value)}
              placeholder="City"
            />
            <br />
            <input
              type="text"
              value={state}
              onChange={(e) => updateState(e.currentTarget.value)}
              placeholder="State"
            />
            <br />

            <input
              type="text"
              value={zipCode}
              onChange={(e) => updateZipCode(e.currentTarget.value)}
              placeholder="Zip Code"
            />
          {/* </div> */}
          <br />
          <input
            type="textarea"
            value={description}
            onChange={(e) => updateDescription(e.currentTarget.value)}
            placeholder="Description"
          />
          <br />
          <input
            type="text"
            value={tags}
            onChange={(e) => updateTags(e.currentTarget.value)}
            placeholder="Tags"
          />
          <br />
        </div>
        <div className="create-posting-img">
          <ImageUploader
            withIcon={true}
            buttonText="Choose Image"
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
        </div>
        <br />
        <input type="submit" value="Create Posting" onClick={handleSubmit} />

        {renderErrors()}
      </form>
    </div>
  );
}
