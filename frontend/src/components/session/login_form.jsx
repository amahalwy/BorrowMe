import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/session_actions";
import { Link } from "react-router-dom";
import {clearErrors} from '../../actions/session_actions';


export default (props) => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const stateErrors = useState({});
  const dispatch = useDispatch();

  // const currentUser = useSelector(state => state.session.isAuthenticated || {})
  const errors = useSelector((state) => state.errors.session);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
      stateErrors,
    };

    dispatch(login(user));
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

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const demoLogin = () => {
    const demoUser = {
      email: "demo@demo.com",
      password: "demo1234"
    }
    dispatch(login(demoUser))
  }
  
  return (
    <div className="login-form-container">
      <div className="login-form-box">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-title">Log In to BorrowMe</h1>
          <div className="login-inputs">
            <input
              type="text"
              value={email}
              onChange={(e) => updateEmail(e.currentTarget.value)}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => updatePassword(e.currentTarget.value)}
              placeholder="Password"
            />
            <br />
            <input type="submit" value="Log In" />
          </div>
        </form>
        <button onClick={() => demoLogin()} className="demo-user-login-button">Log In as Demo User</button>
        <h2 className="signup-redirect-for-login">Don't have an account yet? <Link to="/signup" className="signup-link">Sign Up</Link></h2>
        <div className="login-errors">
          {renderErrors()}
        </div>
      </div>
    </div>
  );
}

