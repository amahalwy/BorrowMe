import * as APIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGIN = "RECEIVE_USER_LOGIN";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

const clear = () => ({
  type: CLEAR_ERRORS,
});

export const signup = (user) => (dispatch) =>
  APIUtil.signup(user).then(
    (res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    },
    (err) => dispatch(receiveErrors(err.response.data))
  );

export const login = (user) => (dispatch) =>
  APIUtil.login(user).then(
    (res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    },
    (err) => dispatch(receiveErrors(err.response.data))
  );

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  APIUtil.setAuthToken(false);
  dispatch(logoutUser());
};

export const clearErrors = () => (dispatch) => {
  dispatch(clear());
};
