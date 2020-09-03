import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {createPosting} from '../../actions/posting_actions';

export default (props) => {

   const [title, updateTitle] = useState("");
   const [price, updatePrice] = useState("");
   const [description, updateDescription] = useState("");
   const [address, updateAddress] = useState("");
   const [city, updateCity] = useState("");
   const [state, updateState] = useState("");
   const [zipCode, updateZipCode] = useState("");
   const [tags, updateTags] = useState("");

  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();


   const handleSubmit = (e) => {
     e.preventDefault();
     let data = {
       title,
        price,
        tags,
        description,
       address,
       city,
       state,
       zipCode,
     };

     dispatch(createPosting(data));
   };

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
     <div className="create-posting-container">
       <form className="posting-form" onSubmit={handleSubmit}>
         <h1>Posting Form</h1>
         <br />
         <div className="posting-first">
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
         </div>
         <br />
         <input
           type="text"
           value={address}
           onChange={(e) => updateAddress(e.currentTarget.value)}
           placeholder="Address"
         />
         <br />
         <div className="posting-second">
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
         </div>
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
         <div className="create-posting-img">
           <label for="img">Select image:</label>
           <input type="file" id="img" name="img" accept="image/*" />
         </div>
         <br />
         <input type="submit" value="Create Posting" />
         {renderErrors()}
       </form>
     </div>
   );
}