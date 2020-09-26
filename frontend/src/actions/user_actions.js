import * as APIUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

const update = (user) => ({
  type: UPDATE_USER,
  user,
});

const receiveErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
})

const successUpdate = status => ({
  type: UPDATE_SUCCESS,
  status
})

export const fetchUser = userId => dispatch => {
  APIUtil.fetchUser(userId)
    .then(user => dispatch(receiveUser(user.data)))
    .catch(err => dispatch(receiveErrors(err.response.data)));
}

export const updateUser = (userId, formData) => dispatch => {
  APIUtil.updateUser(userId, formData)
    .then((user) => {
      dispatch(update(user.data));
      dispatch(successUpdate(user.status));
    })
    .catch((err) => dispatch(receiveErrors(err.response.data)));
}