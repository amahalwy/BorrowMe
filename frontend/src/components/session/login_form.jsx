import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/session_actions.js";

export default (props) => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [stateErrors, updateErrors] = useState({});
  const dispatch = useDispatch();

  const errors = useSelector(state => state.errors.session);
  
  useEffect(() => {
    if (props.currentUser) {
      props.history.push("/");
    }
    updateErrors(props.stateErrors);
  }, [props])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = {
      email,
      password,
      stateErrors,
    };
    debugger
    dispatch(login(user)); 
    props.history.push('hello')
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={email}
            onChange={e => updateEmail(e.currentTarget.value)}
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            value={password}
            onChange={e => updatePassword(e.currentTarget.value)}
            placeholder="Password"
          />
          <br />
          <input type="submit" value="Submit" />
          {renderErrors()}
        </div>
      </form>
    </div>
  );
}






//             </button>
//           </>
//         ) : (
//           <form className="form" onSubmit={handleSubmit}>
//             {error && <p className="error">{error} </p>}
//             <p>Please Login!</p>
//             <input
//               type="text"
//               ref={usernameRef}
//               placeholder="Enter username"
//               value={username}
//               autoFocus
//               onChange={e =>
//                 dispatch({
//                   type: 'field',
//                   fieldName: 'username',
//                   payload: e.currentTarget.value
//                 })
//               }
//             />
//             <input
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={e =>
//                 dispatch({
//                   type: 'field',
//                   fieldName: 'password',
//                   payload: e.currentTarget.value
//                 })
//               }
//             />
//             <button className="submit" type="submit" disabled={isLoading}>
//               {isLoading ? 'Logging In.....' : 'Log In'}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }


















// // src/components/session/login_form_container.js

// import { connect } from "react-redux";
// import { login } from "../../actions/session_actions";
// import LoginForm from "./login_form";

// const mapStateToProps = (state) => {
//   return {
//     errors: state.errors.session,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     login: (user) => dispatch(login(user)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

