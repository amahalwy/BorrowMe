import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/session_actions";

export default (props) => {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [stateErrors, updateErrors] = useState({});
  const dispatch = useDispatch();
  
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

    dispatch(login(user)); 
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




// class LoginForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { email: "", password: "" };
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   // componentWillUnmount() {
//   //   this.props.removeErrors();
//   // }

//   handleChange(field) {
//     return (e) => {
//       this.setState({ [field]: e.target.value });
//     };
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     this.props.login(this.state);
//   }

//   renderErrors() {
//     return this.props.errors[0] ? (
//       <ul className="login-errors">
//         {this.props.errors.map((error, idx) => {
//           return <li key={idx}>{error}</li>;
//         })}
//       </ul>
//     ) : null;
//   }

//   render() {
//     return (
//       <div>
//         <div>
//           <form onSubmit={this.handleSubmit}>
//             <div>
//               <input
//                 type="text"
//                 value={this.state.email}
//                 onChange={this.handleChange("email")}
//                 placeholder="Email"
//               />
//               <br />
//               <input
//                 type="password"
//                 value={this.state.password}
//                 onChange={this.handleChange("password")}
//                 placeholder="Password"
//               />
//               <br />
//               <input type="submit" value="Submit" />
//               {this.renderErrors()}
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }

// }

// export default LoginForm;




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

