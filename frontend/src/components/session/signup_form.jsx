import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { withRouter } from "react-router-dom";
import {signup} from '../../actions/session_actions';

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
  const [stateErrors, updateErrors] = useState({});
  const [clearErrors, updateClearedErrors] = useState(false);

  const isSignedIn = useSelector(state => state.session.isSignedIn || {});
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSignedIn === true) {
      props.history.push("/hello");
    }
    // updateErrors(errors);
    }, [isSignedIn]);

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.signedIn === true) {
  //     this.props.history.push("/login");
  //   }

  //   this.setState({ errors: nextProps.errors });
  // }

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
      zipCode
    }

    dispatch(signup(user))
  }

  const renderErrors = () => {
    return (
      <ul>
        {Object.keys(errors).map((error, i) => (
          <li key={`error-${i}`}>{errors[error]}</li>
        ))}
      </ul>
    );
  }


  // render() {
    return (
      <div className="signup-form-container">
        <form onSubmit={handleSubmit}>
          <div className="signup-form">
            <h1>Sign up for BorrowMe</h1>
            <br/>
            <input
              className="signup-name-input"
              type="text"
              value={firstName}
              onChange={e => updateFirstName(e.currentTarget.value)}
              placeholder="First Name"
            />
            <input
              className="signup-name-input"
              type="text"
              value={lastName}
              onChange={e => updateLastName(e.currentTarget.value)}
              placeholder="Last Name"
            />
            <br />
            <input
              className="signup-email-input"
              type="text"
              value={email}
              onChange={e => updateEmail(e.currentTarget.value)}
              placeholder="Email"
            />
            <br />
            <input
              className="signup-password-input"
              type="password"
              value={password}
              onChange={e => updatePassword(e.currentTarget.value)}
              placeholder="Password"
            />
            <br />
            <input
              className="signup-password-input"
              type="password"
              value={password2}
              onChange={e => updatePassword2(e.currentTarget.value)}
              placeholder="Confirm password"
            />
            <br />
            <input
              className="signup-address-input"
              type="text"
              value={address}
              onChange={e => updateAddress(e.currentTarget.value)}
              placeholder="Address"
            />
            <input
              className="signup-city-input"
              type="text"
              value={city}
              onChange={e => updateCity(e.currentTarget.value)}
              placeholder="City"
            />
            <br />
            <div className="signup-zip-state-container">
              <input
                className="signup-name-input"
                type="text"
                value={zipCode}
                onChange={e => updateZipCode(e.currentTarget.value)}
                placeholder="Zip Code"
              />
              <input
                className="signup-state-input"
                type="text"
                value={state}
                onChange={e => updateState(e.currentTarget.value)}
                placeholder="State"
              />
            </div>
            <br />
            
            
            <br />

            <input className="signup-submit" type="submit" value="Signup" />
            <div className="signup-errors">{renderErrors()}</div>
          </div>
        </form>
      </div>
    )
}