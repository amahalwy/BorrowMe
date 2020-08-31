import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGIN = "RECEIVE_USER_LOGIN";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

// This will be used to redirect the user to the home page
const receiveUserLogIn = () => ({
  type: RECEIVE_USER_LOGIN,
});

const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

// Upon signup, dispatch the approporiate action depending on which type of 
// response we receive from the backend
export const signup = user => dispatch => (
  APIUtil.signup(user).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        console.log(decoded)
        dispatch(receiveCurrentUser(decoded));
    })
      .catch(err => {
        dispatch(receiveErrors(err.response.data))
      })
)
  

// Upon login, set the session token and dispatch the current user. Dispatch 
// errors on failure.
export const login = (user) => (dispatch) => (
  APIUtil.login(user).then(res => {
    
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    APIUtil.setAuthToken(token);
    if (token) {
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded))
    }
  })
    .catch(err => {
      dispatch(receiveErrors(err.response.data));
    })
)

export const logout = () => (dispatch) => {
  // APIUtil.logout()
  // Remove the token from local storage
  localStorage.removeItem("jwtToken");
  // Remove the token from the common axios header
  APIUtil.setAuthToken(false);
  dispatch(logoutUser());
};