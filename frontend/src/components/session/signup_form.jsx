import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {signup, clearErrors} from '../../actions/session_actions';
import {Link} from 'react-router-dom';

export default (props) => {
  const [firstName, updateFirstName] = useState("");
  const [lastName, updateLastName] = useState("");
  const [email, updateEmail] = useState("");
  const [address, updateAddress] = useState("");
  const [city, updateCity] = useState("");
  const [state, updateState] = useState("");
  const [zipCode, updateZipCode] = useState("");
  const [password, updatePassword] = useState("");
  const [password2, updatePassword2] = useState("");

  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      firstName,
      lastName,
      email,
      password,
      password2,
      address,
      city,
      state,
      zipCode,
    };

    dispatch(signup(user));
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

  // render() {
  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit}>
        <div className="signup-form">
          <h1>Sign up for BorrowMe</h1>
          <br />
          <input
            className="signup-name-input"
            type="text"
            value={firstName}
            onChange={(e) => updateFirstName(e.currentTarget.value)}
            placeholder="First Name"
          />
          <input
            className="signup-name-input"
            type="text"
            value={lastName}
            onChange={(e) => updateLastName(e.currentTarget.value)}
            placeholder="Last Name"
          />
          <br />
          <input
            className="signup-email-input"
            type="text"
            value={email}
            onChange={(e) => updateEmail(e.currentTarget.value)}
            placeholder="Email"
          />
          <br />
          <input
            className="signup-password-input"
            type="password"
            value={password}
            onChange={(e) => updatePassword(e.currentTarget.value)}
            placeholder="Password"
          />
          <br />
          <input
            className="signup-password-input"
            type="password"
            value={password2}
            onChange={(e) => updatePassword2(e.currentTarget.value)}
            placeholder="Confirm password"
          />
          <br />
          <input
            className="signup-address-input"
            type="text"
            value={address}
            onChange={(e) => updateAddress(e.currentTarget.value)}
            placeholder="Address"
          />
          <br />
          <div className="signup-zip-state-container">
            <input
              className="signup-city-input"
              type="text"
              value={city}
              onChange={(e) => updateCity(e.currentTarget.value)}
              placeholder="City"
            />
            <input
              className="signup-zip-input"
              type="text"
              value={zipCode}
              onChange={(e) => updateZipCode(e.currentTarget.value)}
              placeholder="Zip Code"
            />
            <input
              className="signup-state-input"
              type="text"
              value={state}
              onChange={(e) => updateState(e.currentTarget.value)}
              placeholder="State"
            />
          </div>
          <br />

          <input className="signup-submit" type="submit" value="Signup" />
          <h2 className="signup-redirect-for-login">
            Already have and account?
            <Link to="/login" className="signup-link">
              {" "}
              Log In
            </Link>
          </h2>
          <div className="signup-errors">{renderErrors()}</div>
        </div>
      </form>
    </div>
  );
}