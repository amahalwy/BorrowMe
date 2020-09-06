import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/session_actions";

export default (props) => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [stateErrors, updateErrors] = useState({});
  const dispatch = useDispatch();
  const [clearErrors, updateClearedErrors] = useState(false);
  
  const currentUser = useSelector(state => state.session.isAuthenticated || {})
  const errors = useSelector(state => state.errors.session);
  
  // useEffect(() => {
  //   if (currentUser === true) {
  //     props.history.push("/hello");
  //   }
  //   updateErrors(props.stateErrors);
  // }, [currentUser])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = {
      email,
      password,
      stateErrors,
    };

    dispatch(login(user)).then(res => console.log(res)); 
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

  useEffect(() => {

    clearErrors ? console.log("not clear") : console.log("CLEAR");
    // clearErrors();
  }, [clearErrors]);
  
  return (
    <div className="login-form-container">
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
          <div className="login-errors">
            {renderErrors()}
          </div>
        </div>
      </form>
    </div>
  );
}

