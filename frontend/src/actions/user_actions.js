import * as APIUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

// const receiveErrors = errors => ({
//   type: RECEIVE_USER_ERRORS,
//   errors
// })

export const fetchUser = userId => dispatch => {
  APIUtil.fetchUser(userId)
    .then(user => dispatch(receiveUser(user.data)))
    // .catch(err => dispatch(receiveErrors(err)));
}

export const updateUser = (userId, formData) => dispatch => {
  APIUtil.updateUser(userId, formData)
    .then(user => dispatch(receiveUser(user)))
    // .catch(err => dispatch(receiveErrors(err)))
}

export const updateUser = (userId, formData) => (dispatch) => {
  APIUtil.updateUser(userId, formData)
    .then(user => dispatch(receiveUser(user)))
}